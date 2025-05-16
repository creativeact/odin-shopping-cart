import { useState, useEffect } from 'react';
import { ProductContext } from './context/ProductContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { ToastManager } from './components/Toast/ToastManager.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { fetchProducts } from './utils/fetchProducts.js';
import routes from './routes.jsx';

function App() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <SearchProvider products={products}>
        <ToastProvider>
          <CartProvider>
            <ToastManager />
            <RouterProvider router={router} />
          </CartProvider>
        </ToastProvider>
      </SearchProvider>
    </ProductContext.Provider>
  )
}

export default App
