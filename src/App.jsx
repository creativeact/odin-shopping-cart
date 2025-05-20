import { CartProvider } from './context/CartContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { ToastManager } from './components/Toast/ToastManager.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes.jsx';

function App() {
  const router = createBrowserRouter(routes);

  return (
    <ToastProvider>
      <CartProvider>
        <ToastManager />
        <RouterProvider router={router} />
      </CartProvider>
    </ToastProvider>
  )
}

export default App
