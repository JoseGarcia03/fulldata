import { useAppSelector } from "../../hooks/useRedux";
import { LoadingIcon } from "../../icons";
import { TableCell, TableRow } from "../ui/table";

interface Props {
  colSpan: number;
  message: string;
}

export const NotDataRow = ({ colSpan, message }: Props) => {
  const damage = useAppSelector( state => state.damage );
  const contractors = useAppSelector( state => state.contractors );

  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="text-center py-6 text-gray-500 dark:text-gray-400 text-theme-sm"
      >
        {
          (damage.loading || contractors.loading)
          ? <span className="flex justify-center items-center flex-col gap-2 p-8"><LoadingIcon className="size-6 animate-spin" /> Cargando...</span>
          : message
        }
      </TableCell>
    </TableRow>
  );
};
