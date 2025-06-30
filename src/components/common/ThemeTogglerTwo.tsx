import { useTheme } from "../../hooks/useTheme"
import { MoonIcon, SunIcon } from "../../icons";

export const ThemeTogglerTwo = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
    onClick={toggleTheme}
    className="inline-flex items-center justify-center text-white transition-colors rounded-full size-14 bg-brand-500 hover:bg-brand-600"
    >
      <SunIcon className="hidden dark:block size-6 !stroke-white" />
      <MoonIcon className="dark:hidden size-6 !stroke-white" />
    </button>
  )
}