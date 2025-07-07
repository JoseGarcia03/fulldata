import { Route } from "react-router-dom"
import { AppLayout } from "../../components/layout/AppLayout"
import { AddDamage } from "../../pages/damage/AddDamage"

export const ContractorRoutes = () => {
  return (
    <Route element={<AppLayout />}>
      <Route path="/damage/add-damage" element={<AddDamage />} />
    </Route>
  )
}