import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import ProductsPage from "./pages/ProductsPage";
import NewProductPage, {
  action as newProductAction,
} from "./pages/NewProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: "productos/nuevo",
        element: <NewProductPage />,
        action: newProductAction,
      },
    ],
  },
]);
