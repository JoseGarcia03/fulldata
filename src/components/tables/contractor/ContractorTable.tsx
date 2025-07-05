import { Table, TableBody } from "../../ui/table";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { DeleteDialog, type DeleteDialogRef } from "../../common/DeleteDialog";
import { useRef } from "react";
import {
  deleteContractor,
  type deleteCrewProps,
} from "../../../helpers/contractor";
import toast from "react-hot-toast";
import { ContractorTableHeader } from "./ContractorTableHeader";
import { NotDataRow } from "../NotDataRow";
import { ContractorTableRow } from "./ContractorTableRow";

export const ContractorTable = () => {
  const contractors = useAppSelector((state) => state.contractors);
  const modalRef = useRef<DeleteDialogRef<deleteCrewProps>>(null);
  const dispatch = useAppDispatch();

  const handleDeleteContractor = (data: deleteCrewProps) => {
    toast.promise(dispatch(deleteContractor(data)).unwrap, {
      loading: "Eliminando contratista...",
      success: "Contratista eliminado correctamente",
      error: (error) => "Error al eliminar el contratista: " + error,
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <ContractorTableHeader />
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {contractors.contractors.length === 0 ? (
              <NotDataRow
                colSpan={4}
                message="No hay contratistas registrados."
              />
            ) : (
              contractors.contractors.map((contractor) => (
                <ContractorTableRow
                  key={contractor.uid}
                  contractor={contractor}
                  onCopy={copyToClipboard}
                  onDelete={() =>
                    modalRef.current?.open({
                      uid: contractor.uid,
                      isLeaderCrew: contractor.isLeaderCrew,
                      crew: contractor.crew,
                    })
                  }
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <DeleteDialog<deleteCrewProps>
        ref={modalRef}
        title="¿Eliminar contratista?"
        description="Esta acción no se puede deshacer. ¿Deseas continuar?"
        onConfirm={handleDeleteContractor}
      />
    </div>
  );
};
