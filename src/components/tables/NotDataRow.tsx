import { TableCell, TableRow } from "../ui/table";

interface Props {
  colSpan: number;
  message: string;
}

export const NotDataRow = ({ colSpan, message }: Props) => {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="text-center py-6 text-gray-500 dark:text-gray-400 text-theme-sm"
      >
        { message }
      </TableCell>
    </TableRow>
  );
};
