import { TableRow, TableCell } from "../../ui/table";
import { TrashIcon } from "../../../icons";
import type { DamageProps } from "../../../redux/slices/damageSlice";
import { formatDateDDMMYYYY } from "../../../helpers/date";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useRedux";

interface Props {
  damage: DamageProps;
  onDelete: () => void;
}

export const DamageTableRow = ({ damage, onDelete }: Props) => {
  const navigate = useNavigate();
  const auth = useAppSelector( state => state.auth );

  const handleClick = () => {
    navigate(`/damage/${damage.ticket}`, { state: damage });
  }

  return (
    <TableRow className="cursor-pointer" onClick={handleClick}>
      <TableCell className="px-5 py-4 sm:px-6 text-start">
        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
          {damage.ticket}
        </span>
      </TableCell>
      <TableCell className="px-5 py-4 sm:px-6 text-start">
        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
          {formatDateDDMMYYYY(damage.visitDate)}
        </span>
      </TableCell>
      <TableCell className="px-5 py-4 sm:px-6 text-start">
        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
          {damage.contractorName}
        </span>
      </TableCell>
      <TableCell className="px-5 py-4 sm:px-6 text-start">
        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 capitalize">
          {damage.crew}
        </span>
      </TableCell>
      {!auth.isAdmin && <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-center max-w-fit px-4">
          <TrashIcon
            width={20}
            height={20}
            onClick={onDelete}
            className="cursor-pointer hover:text-error-500 dark:hover:text-error-500 text-gray-700 dark:text-gray-400"
          />
        </div>
      </TableCell>}
    </TableRow>
  );
};
