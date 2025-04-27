import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  selectCurrentUser,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
// import { useCurrentToken, useCurrentUser } from "../../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser) as TUser;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if Redux store has been updated
    setIsLoading(false);
  }, [user, token]);

  if (isLoading) return null; // Wait for Redux state to load

  if (!token || user?.role !== "user") {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
