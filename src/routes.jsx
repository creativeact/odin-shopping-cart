import { MainLayout } from './layouts/MainLayout.jsx';
import { Shop } from './pages/Shop/Shop.jsx';
import { Checkout } from './pages/Checkout/Checkout.jsx';
import { Home } from './pages/Home/Home.jsx';
import { CategoryPage } from './pages/CategoryPage/CategoryPage.jsx';

const routes = (products) => [
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
        element: <Shop products={products} />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'category/:categoryName',
        element: <CategoryPage products={products} />,
      }
    ],
  },
];

export default routes;