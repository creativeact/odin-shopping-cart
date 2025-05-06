import { useState, useEffect } from 'react';
import { ProductContext } from './context/ProductContext.jsx'
import { SearchContext } from './context/SearchContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { fetchProducts } from './utils/fetchProducts.js';
import routes from './routes.jsx';

function App() {
  const [products, setProducts] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const productData = await fetchProducts();
      setProducts(productData);
    }
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

  if (!products) {
    return <div>Loading products...</div>
  }

  const router = createBrowserRouter(routes(products));

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
