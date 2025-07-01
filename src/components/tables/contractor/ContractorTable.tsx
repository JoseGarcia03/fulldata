import { Link } from "react-router-dom";
import Button from "../../ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import { CopyIcon, PlusIcon, TrashIcon } from "../../../icons";
import { useAppSelector } from "../../../hooks/useRedux";

export const ContractorTable = () => {
  const contractors = useAppSelector( state => state.contractors);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell colSpan={100} className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400 w-full">
                <Link to={"/contractors/add-contractor"}>
                  <Button variant="outline" size="sm" startIcon={<PlusIcon />}>Agregar Contratista</Button>
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
                Cuadrilla
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Credenciales
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {contractors.contractors.map((contractor) => (
              <TableRow key={contractor.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src="https://cdn-icons-png.flaticon.com/512/5364/5364020.png"
                        alt={contractor.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {contractor.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {contractor.isLeaderCrew ? "Líder de Cuadrilla" : "Miembro de Cuadrilla"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {contractor.crew}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div>
                      <span className="flex gap-x-3 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {contractor.email} <CopyIcon className="size-5 cursor-pointer" />
                      </span>
                      <span className="flex gap-x-3 items-center font-medium text-gray-800 text-theme-sm dark:text-white/90 ">
                        {contractor.password} <CopyIcon className="size-5 cursor-pointer" />
                      </span>
                    </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                  <div className="flex items-center justify-center max-w-fit px-4">
                    <TrashIcon width="20" height="20" className="cursor-pointer hover:text-error-500 dark:hover:text-error-500 text-gray-700 dark:text-gray-400" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
