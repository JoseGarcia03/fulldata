import { Route } from "react-router-dom"
import { AppLayout } from "../../components/layout/AppLayout"
import { Damage } from "../../pages/damage/Damage"
import { DamageDetail } from "../../pages/damage/DamageDetail"

export const PrivateRoutes = () => {
  return (
    <Route element={<AppLayout />}>
      <Route path="/damage" element={<Damage />} />
      <Route path="/damage/:id" element={<DamageDetail />} />
    </Route>
  )
}