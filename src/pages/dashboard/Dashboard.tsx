import { useEffect } from "react";
import { PageMeta } from "../../components/common/PageMeta";
import ContractorMetrics from "../../components/dashboard/ContractorMetrics";
import { useAppDispatch } from "../../hooks/useRedux";
import { getContractors } from "../../helpers/contractor";
import { getCrews } from "../../helpers/crew";
import MonthlyMaterialsChart from "../../components/dashboard/MonthlyMaterialsChart";
import { fetchMaterials } from "../../helpers/materials";
import MaterialsGrowthGauge from "../../components/dashboard/MaterialsGrowthGauge";

export const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContractors());
    dispatch(getCrews());
    dispatch(fetchMaterials());
  }, [dispatch])

  return (
    <>
      <PageMeta
        title="FULLDATA | Dashboard"
        description="Visualiza y analiza el uso de materiales, el rendimiento de contratistas y la actividad de tus cuadrillas en un único panel de control."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <ContractorMetrics />

          <MonthlyMaterialsChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <MaterialsGrowthGauge />
        </div>
      </div>
    </>
  );
};
