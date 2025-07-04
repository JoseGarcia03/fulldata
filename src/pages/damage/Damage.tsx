import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { PageMeta } from "../../components/common/PageMeta";
import { DamageTable } from "../../components/tables/damage/DamageTables";

export const Damage = () => {
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