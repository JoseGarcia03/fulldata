import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux"

export const ContractorGuard = () => {
  const auth = useAppSelector( state => state.auth);

  return (!auth.isAdmin && auth.email) ? <Outlet /> : <Navigate to="/signin" replace />
}