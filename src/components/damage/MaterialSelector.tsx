import { useState } from "react";
import { InputField } from "../form/input/InputField";
import { Label } from "../form/Label";
import Button from "../ui/button/Button";
import Select from "../form/Select";
import { materialOptions } from "./materials";

type MaterialType = "serial" | "meters" | "cantidad";

export type MaterialItem = {
  id: string;
  type: MaterialType;
  name: string;
  value: string | number;
};

interface Props {
  onChange: (items: MaterialItem[]) => void;
}

export const MaterialSelector = ({ onChange }: Props) => {
  const [selected, setSelected] = useState<string>("");
  const [inputValue, setInputValue] = useState<string | number>("");
  const [materials, setMaterials] = useState<MaterialItem[]>([]);

  const currentMeta = materialOptions.find((m) => m.value === selected);

  const handleAdd = () => {
    if (!selected || !currentMeta) return;

    // Verificar si ya existe
    const exists = materials.some((m) => m.id === selected);
    if (exists) return; // <- salir si ya existe

    const value =
      currentMeta.type === "serial" ? inputValue : Number(inputValue);

    if (
      currentMeta.type !== "serial" &&
      typeof value === "number" &&
      value <= 0
    )
      return;

    if (currentMeta.type === "serial" && (inputValue as string).length < 6)
      return;

    const newMaterial: MaterialItem = {
      id: selected,
      name:
        materialOptions.find((m) => m.value === selected)?.label || selected,
      type: currentMeta.type as MaterialType,
      value,
    };

    const updated = [...materials, newMaterial];
    setMaterials(updated);
    onChange(updated);

    setSelected("");
    setInputValue("");
  };

  const handleRemove = (id: string) => {
    const updated = materials.filter((m) => m.id !== id);
    setMaterials(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label>Material</Label>
          <Select
            options={materialOptions}
            placeholder="Selecciona un material"
            onChange={(value) => setSelected(value)}
            defaultValue=""
          />
        </div>

        {currentMeta && (
          <div className="flex-1">
            <Label>
              {currentMeta.type === "serial"
                ? "Serial"
                : currentMeta.type === "meters"
                ? "Metros"
                : "Cantidad"}
            </Label>
            <InputField
              type={currentMeta.type === "serial" ? "text" : "number"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                currentMeta.type === "serial"
                  ? "Ej: SN123456"
                  : currentMeta.type === "meters"
                  ? "Ej: 15"
                  : "Ej: 4"
              }
            />
          </div>
        )}

        <div className="w-full sm:w-auto">
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!selected || !inputValue}
            className="w-full sm:w-auto"
          >
            Agregar
          </Button>
        </div>
      </div>

      {materials.length > 0 && (
        <div className="space-y-2">
          <Label>Materiales agregados</Label>
          <ul className="space-y-2">
            {materials.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between border border-gray-200 bg-white px-4 py-3 rounded-lg shadow-sm"
              >
                <div className="text-sm text-gray-800">
                  <span className="font-medium">{m.name}</span>{" "}
                  {m.type === "serial"
                    ? `– Serial: ${m.value}`
                    : `– ${m.value} ${m.type === "meters" ? "mts" : "uds"}`}
                </div>
                <button
                  onClick={() => handleRemove(m.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Eliminar"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
