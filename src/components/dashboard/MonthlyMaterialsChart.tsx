import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useAppSelector } from "../../hooks/useRedux";
import { useMemo } from "react";

const MONTH_LABELS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function MonthlyMaterialsChart() {
  const materials = useAppSelector((s) => s.materials.items);
  const status = useAppSelector((s) => s.materials.status);

  const dataByMonth = useMemo(() => {
    const counts = Array(12).fill(0);
    materials.forEach((m) => {
      if (!m.createdAt) return;
      const d = new Date(m.createdAt);
      counts[d.getMonth()]++;
    });
    return counts;
  }, [materials]);

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Aeonik, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: MONTH_LABELS,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Materiales usados",
      data: dataByMonth,
    },
  ];

  if (status === "loading") {
    return <div>Cargando gráfico de materiales…</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Materiales usados por mes
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart options={options} series={series} type="bar" height={180} />
        </div>
      </div>
    </div>
  );
}
