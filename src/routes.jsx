import { MainLayout } from './layouts/MainLayout.jsx';
import { Shop } from './pages/Shop/Shop.jsx';
import { Checkout } from './pages/Checkout/Checkout.jsx';
import { Home } from './pages/Home/Home.jsx';

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
    ],
  },
];

export default routes;