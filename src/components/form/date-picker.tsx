// components/form/DatePicker.tsx
import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import type { Hook, DateOption } from "flatpickr/dist/types/options";
import { CalendarIcon } from "../../icons";
import { Label } from "./Label";

type PropsType = {
  id?: string;
  mode?: "single" | "multiple" | "range" | "time";
  /** El valor controlado */
  value?: DateOption;
  /** Flatpickr recibirá este onChange con la firma estándar */
  onChange?: Hook;
  label?: string;
  placeholder?: string;
  defaultDate?: DateOption | DateOption[];
};

export default function DatePicker({
  id,
  mode = "single",
  value,
  onChange,
  label,
  placeholder,
  defaultDate,
}: PropsType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fp = useRef<flatpickr.Instance>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Inicializar
    fp.current = flatpickr(inputRef.current, {
      mode,
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
      // si quieres que el calendario se muestre debajo del input
      static: true,
      monthSelectorType: "static",
    });

    return () => {
      fp.current?.destroy();
    };
  }, [mode, onChange, value, defaultDate]);

  // Si el prop `value` cambia, actualizamos la instancia
  useEffect(() => {
    if (fp.current && value !== undefined) {
      fp.current.setDate(value, false, "Y-m-d");
    }
  }, [value]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          readOnly // evitamos que el usuario escriba manualmente
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
        />
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <CalendarIcon className="size-6 text-gray-500 dark:text-gray-400" />
        </span>
      </div>
    </div>
  );
}
