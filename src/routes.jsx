import { MainLayout } from "./layouts/MainLayout.jsx";
import { CartPage } from "./pages/CartPage/CartPage.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage.jsx";
import { ProductPage } from "./pages/ProductPage/ProductPage.jsx";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "product/:slugAndProductId",
        element: <ProductPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
