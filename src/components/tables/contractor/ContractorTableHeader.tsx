import { Link } from "react-router-dom";
import { TableCell, TableHeader, TableRow } from "../../ui/table";
import Button from "../../ui/button/Button";
import { PlusIcon } from "../../../icons";

export const ContractorTableHeader = () => {
  return (
    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
      <TableRow>
        <TableCell
          colSpan={100}
          className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 w-full"
        >
          <Link to={"/contractors/add-contractor"}>
            <Button variant="outline" size="sm" startIcon={<PlusIcon />}>
              Agregar Contratista
            </Button>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          isHeader
          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
        >
          Contratista
        </TableCell>
        <TableCell
          isHeader
          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
        >
          Correo
        </TableCell>
        <TableCell
          isHeader
          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
        >
          Contraseña
        </TableCell>
        <TableCell
          isHeader
          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
        >
          Acciones
        </TableCell>
      </TableRow>
    </TableHeader>
  );
};
