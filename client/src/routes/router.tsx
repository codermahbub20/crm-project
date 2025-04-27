import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import CreateClient from "../pages/Client/CreateClient/CreateClient";
import CreateProject from "../pages/Client/CreatProject/CreateProject";
import Dashboard from "../pages/Dashboard/Dashboard";
import LogIn from "../pages/Login/LogIn";
import Signup from "../pages/Signup/Signup";
import AddLogs from "../pages/Client/AddLogs/AddLogs";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";

// import CheckoutPage from '../pages/ChekoutPage/CheckoutPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/clients",
        element: (
          <ProtectedRoute>
            <CreateClient />
          </ProtectedRoute>
        ),
      },
      {
        path: "/projects",
        element: (
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        ),
      },
      {
        path: "/logs",
        element: (
          <ProtectedRoute>
            <AddLogs />
          </ProtectedRoute>
        ),
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
