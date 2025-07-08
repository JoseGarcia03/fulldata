import { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useAppSelector } from "../../hooks/useRedux";

export default function MaterialsGrowthGauge() {
  const materials = useAppSelector((s) => s.materials.items);
  const [filter] = useState<string>(""); // por si quieres filtrar por tipo

  const { thisCount, prevCount, pct } = useMemo(() => {
    if (!materials || materials.length === 0) {
      return { thisCount: 0, prevCount: 0, pct: 0 };
    }

    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    let thisC = 0,
      prevC = 0;

    materials.forEach((m) => {
      if (!m.createdAt) return;
      const d = new Date(m.createdAt);
      if (filter && m.id !== filter) return;
      if (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth()
      )
        thisC++;
      if (
        d.getFullYear() === prevMonth.getFullYear() &&
        d.getMonth() === prevMonth.getMonth()
      )
        prevC++;
    });

    const raw =
      prevC > 0 ? ((thisC - prevC) / prevC) * 100 : thisC > 0 ? 100 : 0;
    return { thisCount: thisC, prevCount: prevC, pct: raw };
  }, [materials, filter]);

  const options: ApexOptions = {
    colors: [pct >= 0 ? "#22c55e" : "#ef4444"],
    chart: {
      fontFamily: "Aeonik, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: { background: "#E4E7EC", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: { type: "solid", colors: ["#465FFF"] },
    stroke: { lineCap: "round" },
    labels: ["Crecimiento"],
  };

  const series = [Math.abs(pct)];

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Crecimiento mensual de materiales
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Uso mes actual vs. mes anterior
            </p>
          </div>
          <div className="relative inline-block"></div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            {pct >= 0 ? "+" : "-"}
            {Math.abs(pct).toFixed(1)}%
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Mes actual: <strong>{thisCount}</strong> usos, mes anterior:{" "}
          <strong>{prevCount}</strong> usos
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Mes actual
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {thisCount}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Mes anterior
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {prevCount}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Crecimiento
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {pct >= 0 ? (
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5 10l5-5m0 0l5 5m-5-5v12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M5 10l5 5m0 0l5-5m-5 5V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {Math.abs(pct).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
