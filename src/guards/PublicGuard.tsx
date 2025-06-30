import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux"

export const PublicGuard = () => {
  const auth = useAppSelector( state => state.auth);

  if (auth.verifying) {
    return <div className="flex items-center justify-center w-full h-screen">Verificando sesión...</div>
  }

  return !auth.email ? <Outlet /> : <Navigate to="/dashboard" replace />
}