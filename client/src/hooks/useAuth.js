import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider.jsx";

export function useAuth() {
  return useContext(AuthContext);
}
