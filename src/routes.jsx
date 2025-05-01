import MainLayout from './layouts/MainLayout.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
];

export default routes;