import React, { type JSX } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";

export interface DeleteDialogRef<T> {
  open: (payload: T) => void;
  close: () => void;
}

export interface DeleteDialogProps<T> {
  /** Se muestra en el título del diálogo */
  title: string;
  /** Texto explicativo dentro del diálogo */
  description: string;
  /** Callback con el mismo payload que se pasó a open() */
  onConfirm: (payload: T) => void;
}

export const DeleteDialog = forwardRef(
  <T,>(
    { title, description, onConfirm }: DeleteDialogProps<T>,
    ref: React.Ref<DeleteDialogRef<T>>
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [payload, setPayload] = useState<T | null>(null);

    useImperativeHandle(ref, () => ({
      open: (p: T) => {
        setPayload(p);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }));

    const handleDelete = () => {
      if (payload !== null) onConfirm(payload);
      setIsOpen(false);
    };

    const handleCancel = () => {
      setIsOpen(false);
    };

    return createPortal(
      <Dialog open={isOpen} onClose={handleCancel} as={Fragment}>
        <div className="fixed inset-0 z-999999 flex items-center justify-center">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <DialogPanel className="relative bg-white p-6 rounded-xl shadow-lg max-w-sm mx-auto z-10">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <p className="mt-2 text-sm text-gray-600">{description}</p>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
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
) as <T>(
  props: DeleteDialogProps<T> & { ref?: React.Ref<DeleteDialogRef<T>> }
) => JSX.Element;
