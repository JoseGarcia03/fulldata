import { useState } from "react";

type FormErrors<T> = {
  [K in keyof T]?: string;
};

type ValidationRules<T> = Partial<
  Record<
    keyof T,
    {
      required?: boolean;
      pattern?: RegExp;
      message?: string;
    }
  >
>;

export const useForm = <T extends Record<string, unknown>>(
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    const newValue =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : value;

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const setFieldValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const register = <K extends keyof T>(name: K) => {
    const rawValue = values[name];

    return {
      name: name as string,
      value:
        typeof rawValue === "boolean"
          ? undefined // para evitar errores de tipo en inputs text/email
          : (rawValue as string | number | undefined),
      onChange: handleChange,
    };
  };

  const validate = (rules: ValidationRules<T>) => {
    const newErrors: FormErrors<T> = {};

    for (const key in rules) {
      const value = values[key];
      const rule = rules[key];

      if (
        rule?.required &&
        (value === "" || value === null || value === undefined)
      ) {
        newErrors[key] = rule.message || "Este campo es obligatorio";
      } else if (
        rule?.pattern &&
        typeof value === "string" &&
        !rule.pattern.test(value)
      ) {
        newErrors[key] = rule.message || "Formato inválido";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    register,
    validate,
    reset,
    setValues,
    setErrors,
    setFieldValue,
  };
};
