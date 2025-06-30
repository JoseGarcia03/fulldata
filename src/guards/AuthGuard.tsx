import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux"

export const AuthGuard = () => {
  const auth = useAppSelector( state => state.auth);

  return auth.email ? <Outlet /> : <Navigate to="/signin" replace />
}