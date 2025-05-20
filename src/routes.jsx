import { MainLayout } from './layouts/MainLayout.jsx';
import { CartPage } from './pages/CartPage/CartPage.jsx';
import { Home } from './pages/Home/Home.jsx';
import { CategoryPage } from './pages/CategoryPage/CategoryPage.jsx';
import { ProductPage } from './pages/ProductPage/ProductPage.jsx';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'category/:categoryName',
        element: <CategoryPage />,
      },
      {
        path: 'product/:slugAndProductId',
        element: <ProductPage />,
      }
    ],
  },
];

export default routes;