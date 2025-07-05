import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { Table, TableBody } from "../../ui/table";
import { NotDataRow } from "../NotDataRow";
import { DamageTableHeader } from "./DamageTableHeader";
import { DamageTableRow } from "./DamageTableRow";
import { deleteDamage } from "../../../helpers/damage";
import { DeleteDialog, type DeleteDialogRef } from "../../common/DeleteDialog";
import { useRef } from "react";

export const DamageTable = () => {
  const dialogRef = useRef<DeleteDialogRef<string>>(null);
  const damage = useAppSelector((state) => state.damage);
  const dispatch = useAppDispatch();

  const handleDeleteDamage = (ticketId: string) => {
    toast.promise(dispatch(deleteDamage(ticketId)).unwrap(), {
      loading: "Eliminando avería…",
      success: "Avería y materiales eliminados con éxito",
      error: (err) => err,
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <DamageTableHeader />
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {damage.damage.length === 0 ? (
              <NotDataRow colSpan={5} message="No hay tickets registrados" />
            ) : (
              damage.damage.map((dm) => (
                <DamageTableRow
                  key={dm.ticket}
                  damage={dm}
                  onDelete={() => dialogRef.current?.open(dm.ticket)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <DeleteDialog<string>
        ref={dialogRef}
        title="¿Eliminar avería?"
        description="Esta acción no se puede deshacer. ¿Deseas continuar?"
        onConfirm={handleDeleteDamage}
      />
    </div>
  );
};
