import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { ChevronDownIcon, LogoutIcon } from "../../icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import toast from "react-hot-toast";
import { logout } from "../../helpers/auth";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAppSelector( state => state.auth);
  const dispatch = useAppDispatch();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleLogout = () => {
    toast.promise(
      dispatch(logout()).unwrap(),
      {
        loading: "Cerrando sesión...",
        success: "Sesión cerrada con éxito",
        error: (err) => err ?? "Error al cerrar sesión"
      }
    )
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="http://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg" alt="User" />
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{ auth.displayName }</span>
        <ChevronDownIcon
        className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 size-5 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            { auth.displayName }
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            { auth.email }
          </span>
        </div>
        <button
        disabled={auth.loading}
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <LogoutIcon className="atroke-gray-500 group-hover:atroke-gray-700 dark:group-hover:atroke-gray-300 size-6" />
          Cerrar Sesión
        </button>
      </Dropdown>
    </div>
  );
}
