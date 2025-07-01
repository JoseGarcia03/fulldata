import type { ReactNode } from "react"
import { GridShape } from "../common/GridShape";
import { ThemeTogglerTwo } from "../common/ThemeTogglerTwo";

interface Props {
  children: ReactNode;
}
export const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
        <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
          { children }
          <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
            <div className="relative flex items-center justify-center z-1">
              <GridShape />
              <div className="flex flex-col items-center max-w-xs">
                <div className="mb-4">
                  <img
                    width={320}
                    height={48}
                    src="/images/logo/fulldata-logo.png"
                    alt="Logo"
                  />
                  <p className="text-center text-gray-400 dark:text-white/60 -mt-8">
                    Conectados contigo
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </div>
    </>
  )
}