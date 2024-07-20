import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import ProductsPage, {
  loader as productPageLoader,
  action as updateAvailabilityAction,
} from "./pages/ProductsPage";
import NewProductPage, {
  action as newProductAction,
} from "./pages/NewProductPage";
import EditProductPage, {
  loader as editProductPageLoader,
  action as editProductPageAction,
} from "./pages/EditProductPage";
import { action as deleteProductAcion } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
        loader: productPageLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "productos/nuevo",
        element: <NewProductPage />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar",
        element: <EditProductPage />,
        loader: editProductPageLoader,
        action: editProductPageAction,
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAcion,
      },
    ],
  },
]);
