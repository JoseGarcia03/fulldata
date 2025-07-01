import toast from "react-hot-toast";
import { MailIcon, PhoneIcon } from "../../icons";
import { InputField } from "../form/input/InputField";
import { InputPassword } from "../form/input/InputPassword";
import { Label } from "../form/Label";
import Select from "../form/Select";
import Switch from "../form/switch/Switch";
import Button from "../ui/button/Button";
import { registerContractor } from "../../helpers/contractor";
import { useForm } from "../../hooks/useForm";
import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isPhone = /^[0-9]{10,15}$/;

export const FormContractor = () => {
  const contractors = useAppSelector((state) => state.contractors);
  const crews = useAppSelector((state) => state.crews);
  const { values, register, validate, errors, setFieldValue } = useForm({
    name: "",
    email: "",
    password: "",
    phone: "",
    crew: "",
    isLeaderCrew: false,
  });
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      name: {
        required: true,
        message: "El nombre es obligatorio.",
      },
      email: {
        required: true,
        pattern: isEmail,
        message: "Debes ingresar un correo electrónico válido.",
      },
      password: {
        required: true,
        pattern: /^.{6,}$/,
        message: "La contraseña debe tener al menos 6 caracteres.",
      },
      phone: {
        required: false,
        pattern: isPhone,
        message: "El número de teléfono debe contener entre 10 y 15 dígitos.",
      },
      crew: {
        required: values.isLeaderCrew ? false : true,
        message: "Selecciona una cuadrilla.",
      },
    });

    if (isValid) {
      toast.promise(
        dispatch(
          registerContractor({
            ...values,
            createdBy: auth.currentUser?.uid || "",
            crew: values.isLeaderCrew ? values.name : values.crew,
          })
        ).unwrap().then(() => navigate("/contractors")),
        {
          loading: "Registrando contratista...",
          success: "Contratista registrado exitosamente.",
          error: (error) =>
            error || "Ocurrió un error al registrar el contratista.",
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 xl:grid-cols-2"
    >
      <div>
        <div>
          <Label htmlFor="name">
            Nombre<span className="text-error-500">*</span>{" "}
          </Label>
          <InputField
            id="name"
            type="text"
            placeholder="John Doe"
            hint={errors.name}
            error={!!errors.name}
            {...register("name")}
          />
        </div>
      </div>
      <div>
        <Label>
          Correo Electrónico<span className="text-error-500">*</span>{" "}
        </Label>
        <div className="relative">
          <InputField
            placeholder="info@fulldata.com"
            type="email"
            className="pl-[62px]"
            hint={errors.email}
            error={!!errors.email}
            {...register("email")}
          />
          <span
            className={`absolute left-0 ${
              errors.email ? "top-6" : "top-1/2"
            } -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400`}
          >
            <MailIcon className="size-6" />
          </span>
        </div>
      </div>
      <div>
        <Label htmlFor="password">
          Contraseña <span className="text-error-500">*</span>{" "}
        </Label>
        <InputPassword
          id="password"
          showPassword={showPass}
          setShowPassword={setShowPass}
          hint={errors.password}
          error={!!errors.password}
          {...register("password")}
        />
      </div>
      <div>
        <Label>Número de celular</Label>
        <div className="relative">
          <InputField
            placeholder="04125322419"
            type="tel"
            className="pl-[62px]"
            hint={errors.phone}
            error={!!errors.phone}
            {...register("phone")}
          />
          <span
            className={`absolute left-0 ${
              errors.phone ? "top-6" : "top-1/2"
            } -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400`}
          >
            <PhoneIcon className="size-6 stroke-gray-500 dark:stroke-gray-400" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <Switch
          label="¿Eres lider de cuadrilla?"
          defaultChecked={!!values.isLeaderCrew}
          onChange={(checked) => setFieldValue("isLeaderCrew", checked)}
        />
        <div className={`${values.isLeaderCrew ? "hidden" : "block"} -mt-5`}>
          <Label>Cruadrilla</Label>
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
      </div>
      <div className="xl:col-span-2">
        <Button disabled={contractors.loading} type="submit">
          Crear
        </Button>
      </div>
    </form>
  );
};
