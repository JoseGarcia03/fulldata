import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import type { deleteCrewProps } from "../../helpers/contractor";

export interface DeleteDialogRef {
  open: (id: string, isLeaderCrew: boolean, crew?: string) => void;
  close: () => void;
}

interface Props {
  onConfirm: (contractor: deleteCrewProps) => void;
}

export const DeleteDialog = forwardRef<DeleteDialogRef, Props>(
  ({ onConfirm }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [contractor, setContractor] = useState<deleteCrewProps | null>(null);

    useImperativeHandle(ref, () => ({
      open: (id: string, isLeaderCrew: boolean, crew?: string) => {
        setContractor({ id, isLeaderCrew, crew });
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }));

    const handleDelete = () => {
      if (contractor?.id) {
        onConfirm(contractor);
      }
      setIsOpen(false);
    };

    const handleCancel = () => {
      setIsOpen(false);
    };

    return createPortal(
      <Dialog open={isOpen} onClose={handleCancel} as={Fragment}>
        <div className="fixed inset-0 z-999999 flex items-center justify-center">
          <DialogBackdrop className="fixed inset-0 bg-black opacity-30" />
          <DialogPanel className="relative bg-white p-6 rounded shadow-xl z-50 max-w-sm mx-auto">
            <DialogTitle className="text-lg font-bold">
              ¿Eliminar contratista?
            </DialogTitle>
            <div className="mt-2 text-sm text-gray-500">
              Esta acción no se puede deshacer. ¿Deseas eliminar este
              contratista?
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>,
      document.body
    );
  }
);
