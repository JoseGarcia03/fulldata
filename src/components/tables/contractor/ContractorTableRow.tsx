import { TableRow, TableCell } from "../../ui/table";
import { TrashIcon, CopyIcon } from "../../../icons";
import type { ContractorProps } from "../../../redux/slices/contractorSlice";

interface Props {
  contractor: ContractorProps;
  onCopy: (value: string) => void;
  onDelete: () => void;
}

export const ContractorTableRow = ({ contractor, onCopy, onDelete }: Props) => (
  <TableRow>
    <TableCell className="px-5 py-4 sm:px-6 text-start">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img
            width={40}
            height={40}
            src="https://cdn-icons-png.flaticon.com/512/5364/5364020.png"
            alt={contractor.displayName}
          />
        </div>
        <div>
          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
            {contractor.displayName}
          </span>
          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
            {contractor.isLeaderCrew ? "Líder de Cuadrilla" : "Miembro de Cuadrilla"}
          </span>
        </div>
      </div>
    </TableCell>

    <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
      <span className="flex gap-x-3 font-medium text-gray-800 dark:text-white/90">
        {contractor.email}
        <CopyIcon className="size-5 cursor-pointer" onClick={() => onCopy(contractor.email)} />
      </span>
    </TableCell>

    <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
      <span className="flex gap-x-3 font-medium text-gray-800 dark:text-white/90">
        {contractor.password}
        <CopyIcon className="size-5 cursor-pointer" onClick={() => onCopy(contractor.password)} />
      </span>
    </TableCell>

    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center justify-center max-w-fit px-4">
        <TrashIcon
          width={20}
          height={20}
          onClick={onDelete}
          className="cursor-pointer hover:text-error-500 dark:hover:text-error-500 text-gray-700 dark:text-gray-400"
        />
      </div>
    </TableCell>
  </TableRow>
);
