import { Route } from "react-router-dom"
import { AppLayout } from "../../components/layout/AppLayout"
import { Contractors } from "../../pages/contractor/Contractors"
import { AddContractor } from "../../pages/contractor/AddContractor"
import { Dashboard } from "../../pages/dashboard/Dashboard"

export const AdminRoutes = () => {

  return (
    <>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contractors" element={<Contractors />} />
        <Route path="/contractors/add-contractor" element={<AddContractor />} />
      </Route>
    </>
  )
}