import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import DatePicker from "../form/date-picker";
import { InputField } from "../form/input/InputField";
import { Label } from "../form/Label";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import { MaterialSelector, type MaterialItem } from "./MaterialSelector";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { registerDamage } from "../../helpers/damage";
import { useNavigate } from "react-router-dom";

export const FormDamage = () => {
  const crews = useAppSelector((state) => state.crews);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, errors, register, setFieldValue, validate } = useForm({
    ticket: "",
    crew: "",
    visitDate: new Date(),
    contractorName: auth.displayName,
    comments: "",
    materials: [] as MaterialItem[],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      ticket: { required: true, message: "El número de ticket es obligatorio" },
      visitDate: {
        required: true,
        message: "La fecha de visita es obligatoria",
      },
      crew: { required: true, message: "Debe seleccionar una cuadrilla" },
    });

    if (isValid) {
      const payload = {
        ...values,
        createdAt: new Date().toISOString(),
        visitDate: new Date(values.visitDate).toISOString(),
      };

      toast.promise(dispatch(registerDamage(payload)).unwrap().then(() => navigate("/damage")), {
        loading: "Registrando avería…",
        success: "Avería registrada correctamente",
        error: (err) => err,
      });
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-6 xl:grid-cols-2"
      onSubmit={handleSubmit}
    >
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
      <div className="relative z-10">
        <Label htmlFor="visitDate">
          Fecha de visita<span className="text-error-500">*</span>{" "}
        </Label>
        <DatePicker
          id="visitDate"
          mode="single"
          onChange={(value) => setFieldValue("visitDate", value[0])}
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
        <MaterialSelector
          onChange={(items) => setFieldValue("materials", items)}
        />
      </div>
      <div className="xl:col-span-2">
        <Button type="submit" className="float-right">
          Registrar Avería
        </Button>
      </div>
    </form>
  );
};
