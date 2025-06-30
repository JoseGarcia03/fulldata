import { useState } from "react";

type FormErrors<T> = {
  [K in keyof T]?: string;
};

export const useForm = <T extends Record<string, unknown>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const register = (name: keyof T) => ({
    name,
    value: values[name] ?? '',
    onChange: handleChange,
  });

  const validate = (rules: Partial<Record<keyof T, {
    required?: boolean;
    pattern?: RegExp;
    message?: string;
  }>>) => {
    const newErrors: FormErrors<T> = {};

    for (const key in rules) {
      const value = values[key];
      const rule = rules[key];

      if (rule?.required && !value) {
        newErrors[key] = rule.message || "Este campo es obligatorio";
      } else if (rule?.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
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
  };
};
