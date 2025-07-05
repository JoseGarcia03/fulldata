import { useMemo } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GroupIcon,
  HatAdventureIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { countByMonth } from "../../helpers/date";

export default function ContractorMetrics() {
  const contractors = useAppSelector((state) => state.contractors);
  const crews = useAppSelector((state) => state.crews);

  const { ctrTotal, ctrPct, crwTotal, crwPct } = useMemo(() => {
    const now = new Date();
    const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisC = countByMonth(contractors.contractors, now);
    const prevC = countByMonth(contractors.contractors, last);
    const thisQ = countByMonth(crews.crews, now);
    const prevQ = countByMonth(crews.crews, last);

    // porcentaje (actual-previo)/previo
    const pctC = prevC > 0 ? (thisC - prevC) / prevC : thisC > 0 ? 1 : 0;
    const pctQ = prevQ > 0 ? (thisQ - prevQ) / prevQ : thisQ > 0 ? 1 : 0;

    return {
      ctrTotal: contractors.contractors.length,
      ctrPct: pctC,
      crwTotal: crews.crews.length,
      crwPct: pctQ,
    };
  }, [contractors, crews]);

  const metrics = [
    {
      Icon: HatAdventureIcon,
      label: "Contratistas",
      total: ctrTotal,
      pct: ctrPct,
    },
    {
      Icon: GroupIcon, // asumo que tienes otro icon para cuadrillas
      label: "Cuadrillas",
      total: crwTotal,
      pct: crwPct,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {metrics.map(({ Icon, label, total, pct }) => {
        const isUp = pct >= 0;
        return (
          <div
            key={label}
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <Icon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {label}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {total.toLocaleString()}
                </h4>
              </div>
              <Badge color={isUp ? "success" : "error"}>
                {isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {(Math.abs(pct) * 100).toFixed(1)}%
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
