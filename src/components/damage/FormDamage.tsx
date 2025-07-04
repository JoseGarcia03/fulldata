import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useAppSelector } from "../../hooks/useRedux";
import DatePicker from "../form/date-picker";
import { InputField } from "../form/input/InputField";
import { Label } from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import { MaterialSelector, type MaterialItem } from "./MaterialSelector";

export const FormDamage = () => {
  const crews = useAppSelector((state) => state.crews);
  const auth = useAppSelector((state) => state.auth);
  const { values, errors, register, setFieldValue } = useForm({
    ticket: "",
    crew: "",
    visitDate: "",
    contractorName: auth.displayName,
    comments: "",
    materialsUsed: [] as MaterialItem[]
  });

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <form className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div>
        <Label htmlFor="ticket">
          Número de Ticket<span className="text-error-500">*</span>{" "}
        </Label>
        <InputField
          id="ticket"
          type="number"
          placeholder="0000"
          hint={errors.ticket}
          error={!!errors.ticket}
          {...register("ticket")}
        />
      </div>
      <div>
        <Label htmlFor="visit-date">
          Fecha de visita<span className="text-error-500">*</span>{" "}
        </Label>
        <DatePicker
          id="visit-date"
          onChange={(value) =>
            setFieldValue("visitDate", value.toLocaleString("es-CO"))
          }
        />
      </div>
      <div>
        <Label htmlFor="crew">
          Cruadrilla<span className="text-error-500">*</span>{" "}
        </Label>
        <Select
          options={crews.crews}
          placeholder="Seleccione su cuadrilla"
          className="dark:bg-dark-900"
          onChange={(value) => setFieldValue("crew", value)}
        />
        {errors.crew && (
          <p className={`mt-1.5 text-xs text-error-500`}>{errors.crew}</p>
        )}
      </div>
      <div>
        <Label htmlFor="comments">Observaciones</Label>
        <TextArea
          value={values.comments}
          hint={errors.comments}
          error={!!errors.comments}
          onChange={(value) => setFieldValue("comments", value)}
        />
      </div>
      <div className="xl:col-span-2">
        <MaterialSelector onChange={(items) => setFieldValue("materialsUsed", items)} />
      </div>
      <div className="xl:col-span-2">
        <Button type="submit" className="float-right">
          Registrar Avería
        </Button>
      </div>
    </form>
  );
};
