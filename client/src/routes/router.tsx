import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CreateClient from "../pages/Client/CreateClient/CreateClient";
import CreateProject from "../pages/Client/CreatProject/CreateProject";
import Dashboard from "../pages/Dashboard/Dashboard";
import LogIn from "../pages/Login/LogIn";
import Signup from "../pages/Signup/Signup";

// import CheckoutPage from '../pages/ChekoutPage/CheckoutPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/clients",
        element: <CreateClient />,
      },
      {
        path: "/projects",
        element: <CreateProject />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
