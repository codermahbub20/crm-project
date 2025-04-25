import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

// import CheckoutPage from '../pages/ChekoutPage/CheckoutPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        // element: <Home />,
      },
    ],
  },
]);

export default router;
