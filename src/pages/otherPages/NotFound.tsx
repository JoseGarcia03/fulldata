import { Link } from "react-router-dom"
import { GridShape } from "../../components/common/GridShape"
import { PageMeta } from "../../components/common/PageMeta"
import { useAppSelector } from "../../hooks/useRedux"

export const NotFound = () => {
  const auth = useAppSelector( state => state.auth );

  return (
    <>
      <PageMeta
      title="FULLDATA | Página no encontrada"
      description="Página no encontrada (Error 404). La URL que ingresaste no está disponible. Regresa a la página principal o explora nuestras secciones principales para encontrar lo que buscas."
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            Página no encontrada
          </h1>

          <img src="/images/error/404.svg" alt="404" className="dark:hidden" />
          <img
            src="/images/error/404-dark.svg"
            alt="404"
            className="hidden dark:block"
          />

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Ups... parece que esta página no existe o fue movida.
          </p>

          <Link
            to={auth.isAdmin ? "/dashboard" : "/damage"}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Volver al inicio
          </Link>
        </div>
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - FULLDATA
        </p>
      </div>
    </>
  )
}