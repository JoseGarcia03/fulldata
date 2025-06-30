import clsx from "clsx"
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge"

interface Props {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export const Label = ({ htmlFor, children, className }: Props) => {
  return (
    <label
    htmlFor={htmlFor}
    className={clsx(
      twMerge(
        "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",
        className
      )
    )}
    >
      { children }
    </label>
  )
}