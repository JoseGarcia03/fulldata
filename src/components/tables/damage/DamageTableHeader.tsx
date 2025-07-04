import { Link } from "react-router-dom";
import { TableCell, TableHeader, TableRow } from "../../ui/table";
import Button from "../../ui/button/Button";
import { PlusIcon } from "../../../icons";

export const DamageTableHeader = () => {
  return (
    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
      <TableRow>
        <TableCell
          colSpan={100}
          className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 w-full"
        >
          <Link to={"/damage/add-damage"}>
            <Button variant="outline" size="sm" startIcon={<PlusIcon />}>
              Llenado de avería
            </Button>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          isHeader
          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
        >
          # Ticket
        </TableCell>
        <TableCell
          isHeader
          className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
        >
          Fecha de la visita
        </TableCell>
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
          Cuadrilla
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
