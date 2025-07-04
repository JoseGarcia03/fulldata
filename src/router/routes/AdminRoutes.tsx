import { Route } from "react-router-dom"
import { AppLayout } from "../../components/layout/AppLayout"
import { useAppSelector } from "../../hooks/useRedux"
import { Contractors } from "../../pages/contractor/Contractors"
import { AddContractor } from "../../pages/contractor/AddContractor"

export const AdminRoutes = () => {
  const auth = useAppSelector( state => state.auth );

  return (
    <>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<h1>Bienvenido {auth.displayName}</h1>} />
        <Route path="/contractors" element={<Contractors />} />
        <Route path="/contractors/add-contractor" element={<AddContractor />} />
      </Route>
    </>
  )
}