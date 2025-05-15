import { MainLayout } from './layouts/MainLayout.jsx';
import { Shop } from './pages/Shop/Shop.jsx';
import { Checkout } from './pages/Checkout/Checkout.jsx';
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
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'category/:categoryName',
        element: <CategoryPage />,
      },
      {
        path: 'product/:productTitle',
        element: <ProductPage />,
      }
    ],
  },
];

export default routes;