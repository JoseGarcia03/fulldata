import { EyeIcon, EyeSlashIcon } from "../../../icons";
import { InputField } from "./InputField";

interface Props {
  id?: string;
  name?: string;
  value?: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  placeholder?: string;
  error?: boolean;
  hint?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputPassword = ({
  id,
  name,
  value,
  onChange,
  showPassword,
  placeholder,
  setShowPassword,
  error,
  hint,
}: Props) => {
  return (
    <div className="relative">
      <InputField
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      autocomplete="new-password"
      error={error}
      hint={hint}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4 ${hint ? "top-6" : "top-1/2"}`}
      >
        {showPassword ? (
          <EyeIcon className="text-gray-500 dark:text-gray-500 size-5" />
        ) : (
          <EyeSlashIcon className="text-gray-500 dark:text-gray-400 size-5" />
        )}
      </span>
    </div>
  )
}