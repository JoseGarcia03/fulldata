import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux"

export const PrivateGuard = () => {
  const auth = useAppSelector( state => state.auth);

  return auth.email ? <Outlet /> : <Navigate to="/signin" replace />
}