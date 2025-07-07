import { useLocation } from "react-router-dom";
import type { DamageProps } from "../../redux/slices/damageSlice";
import { formatDateDDMMYYYY } from "../../helpers/date";

export const Detail = () => {
  const location = useLocation();
  const damage = (location.state as DamageProps) || undefined;

  return (
    <div className="max-w-4xl">
      <div className="bg-white dark:bg-gray-900">
        <div className="mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ticket #{damage?.ticket}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
          <DetailItem label="Contratista" value={damage?.contractorName} />
          <DetailItem label="Ticket" value={damage?.ticket} />
          <DetailItem label="Cuadrilla" value={damage?.crew} />
          <DetailItem
            label="Fecha de visita"
            value={formatDateDDMMYYYY(damage?.visitDate)}
          />
          {damage?.comments && (
            <div className="sm:col-span-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Comentarios
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {damage.comments}
              </p>
            </div>
          )}
        </div>

        {damage?.materials?.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
              Materiales utilizados
            </h3>
            <ul className="divide-y divide-gray-200 dark:divide-white/10">
              {damage.materials.map((mat, idx) => (
                <li
                  key={idx}
                  className="py-2 flex justify-between text-sm text-gray-700 dark:text-white/80"
                >
                  <span className="font-medium">{mat.name}</span>
                  <span>
                    {mat.type === "cantidad"
                      ? `${mat.value} unidades`
                      : mat.type === "meters"
                      ? `${mat.value} metros`
                      : mat.type === "serial"
                      ? `${mat.value}`
                      : mat.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente reutilizable
const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-medium text-gray-800 dark:text-white/90 capitalize">
      {value || "—"}
    </p>
  </div>
);
