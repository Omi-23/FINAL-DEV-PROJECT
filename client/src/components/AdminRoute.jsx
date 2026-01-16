import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { Loading } from "./Loading.jsx";

export function AdminRoute({ children }) {
  const { user, loading, role } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}
