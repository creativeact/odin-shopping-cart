import { useState, useEffect } from 'react';
import { ProductContext } from './context/ProductContext.jsx'
import { SearchContext } from './context/SearchContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { fetchProducts } from './utils/fetchProducts.js';
import routes from './routes.jsx';

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function loadProducts() {

      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
      loadProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query.trim() || !products) {
      setSearchResults([]);
      return;
    }
    
    const filteredResults = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
    );
    
    setSearchResults(filteredResults);
  };

  const searchContextValue = {
    searchQuery,
    searchResults,
    handleSearch
  };

  if (loading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return (
      <>
        <h2>Error loadign store data</h2>
        <p>{error}</p>
      </>
    )
  }

  const router = createBrowserRouter(routes);

  return (
    <ProductContext.Provider value={products}>
      <SearchContext.Provider value={searchContextValue}>
        <RouterProvider router={router} />
      </SearchContext.Provider>
    </ProductContext.Provider>
  )
}

export default App

/* const [cartItems, setCartItems] = useState([]); */
/* functions to add later: addToCart, removeFromCart, updateQuantity */
