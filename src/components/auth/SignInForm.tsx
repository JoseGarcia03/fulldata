import { useState, type FormEvent } from "react";
import { InputField } from "../form/input/InputField";
import { Label } from "../form/Label";
import { InputPassword } from "../form/input/InputPassword";
import Button from "../ui/button/Button";
import { useForm } from "../../hooks/useForm";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { loginWithEmailAndPassword } from "../../helpers/auth";

export const SignInForm = () => {
  const [showPass, setShowPass] = useState(false);
  const auth = useAppSelector( state => state.auth);
  const { values, register, validate, errors } = useForm({ email: "", password: "" });
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate({
      email: { required: true, pattern: /^\S+@\S+\.\S+/, message: "Correo inválido" },
      password: { required: true, message: "La contraseña es obligatoria" },
    });

    if (isValid) {
      toast.promise(
        dispatch(loginWithEmailAndPassword(values)).unwrap,
        {
          loading: "Iniciando sesión...",
          success: "Sesión iniciada con éxito",
          error: (err) =>
            err === "auth/user-not-found"
              ? "No existe una cuenta con este correo"
              : err === "auth/invalid-credential"
              ? "Usuario o contraseña incorrecta"
              : err === "auth/too-many-requests"
              ? "Demasiados intentos. Intenta más tarde."
              : "Error al iniciar sesión",
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
              Iniciar Sesión
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Introduzca su correo electrónico y contraseña para iniciar sesión.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email">
                    Correo Electrónico <span className="text-error-500">*</span>{" "}
                  </Label>
                  <InputField
                  id="email"
                  placeholder="info@fulldata.com"
                  autocomplete="email"
                  hint={errors.email}
                  error={!!errors.email}
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
                  <Button
                  type="submit"
                  className="w-full"
                  size="sm"
                  disabled={auth.loading}
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};