import { Route } from "react-router-dom"
import { AppLayout } from "../../components/layout/AppLayout"
import { Damage } from "../../pages/damage/Damage"
import { AddDamage } from "../../pages/damage/AddDamage"

export const ContractorRoutes = () => {
  return (
    <Route element={<AppLayout />}>
      <Route path="/damage" element={<Damage />} />
      <Route path="/damage/add-damage" element={<AddDamage />} />
    </Route>
  )
}