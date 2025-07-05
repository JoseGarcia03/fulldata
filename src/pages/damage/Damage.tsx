import { useEffect } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { PageMeta } from "../../components/common/PageMeta";
import { DamageTable } from "../../components/tables/damage/DamageTables";
import { useAppDispatch } from "../../hooks/useRedux";
import { getDamage } from "../../helpers/damage";

export const Damage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDamage())
  }, [dispatch]);

  return (
    <>
      <PageMeta
        title="FULLDATA | Averías"
        description="Gestiona tus averías. Crea, visualiza y elimina averías desde un panel intuitivo y seguro."
      />
      <PageBreadcrumb pageTitle="Averías" />
      <div className="space-y-6">
        <ComponentCard title="Averías">
          <DamageTable />
        </ComponentCard>
      </div>
    </>
  )
};