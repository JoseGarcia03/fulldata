import { useEffect } from "react"
import ComponentCard from "../../components/common/ComponentCard"
import { PageMeta } from "../../components/common/PageMeta"
import { FormDamage } from "../../components/damage/FormDamage"
import { useAppDispatch } from "../../hooks/useRedux"
import { getCrews } from "../../helpers/crew"

export const AddDamage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCrews())
  }, [dispatch])

  return (
    <>
      <PageMeta
        title="FULLDATA | Llenado de avería"
        description="Registra una nueva avería de manera rápida y precisa. Completa el formulario con los datos del contratista y los detalles del incidente para llevar un control eficiente."
      />
      <div className="space-y-6">
        <ComponentCard
          title="Llenado de avería"
          desc="Completa el formulario para llenar una avería"
        >
          <FormDamage />
        </ComponentCard>
      </div>
    </>
  )
}