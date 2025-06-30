import { useState, type FormEvent } from "react";
import { useForm } from "../../hooks/useForm";
import { InputField } from "../form/input/InputField"
import { InputPassword } from "../form/input/InputPassword";
import { Label } from "../form/Label"
import Button from "../ui/button/Button"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { registerWithEmailAndPassword } from "../../helpers/auth";
import toast from "react-hot-toast";

export const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const auth = useAppSelector( state => state.auth);
  const { values, register, validate, errors } = useForm({ name: "", email: "", password: "" });
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      name: {
        required: true,
        pattern: /^[A-Za-zÀ-ÿ\u00f1\u00d1\s'-]{2,50}$/,
        message: "El nombre debe tener entre 2 y 50 letras, sin números ni símbolos",
      },
      email: { required: true, pattern: /^\S+@\S+\.\S+/, message: "Correo inválido" },
      password: { required: true, message: "La contraseña es obligatoria" },
    });

    if (isValid) {
      toast.promise(
        dispatch(registerWithEmailAndPassword({ displayName: values.name, isAdmin: true, ...values})).unwrap,
        {
          loading: "Registrando...",
          success: "Cuenta creada con exito",
          error: (err) => err || "Ocurrió un error al registrar",
        }
      )
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Crear Cuenta
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Regístrate con tu correo y una contraseña segura para comenzar a
              usar FULLDATA.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    Nombre<span className="text-error-500">*</span>
                  </Label>
                  <InputField
                    type="text"
                    id="name"
                    placeholder="Ingresa tu nombre"
                    hint={errors.name}
                    error={!!errors.name}
                    autocomplete="name"
                    {...register("name")}
                  />
                </div>
                <div>
                  <Label htmlFor="email">
                    Correo Electrónico<span className="text-error-500">*</span>
                  </Label>
                  <InputField
                    type="email"
                    id="email"
                    placeholder="Ingresa tu correo electrónico"
                    hint={errors.email}
                    error={!!errors.email}
                    autocomplete="email"
                    {...register("email")}
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    Contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <InputPassword
                  id="password"
                  showPassword={showPass}
                  setShowPassword={setShowPass}
                  placeholder="Ingrese su contraseña"
                  hint={errors.password}
                  error={!!errors.password}
                  {...register("password")}
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full" size="sm" disabled={auth.loading}>
                    Crear Cuenta
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}