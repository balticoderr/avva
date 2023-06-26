import { DeleteModalProps } from "@/types";
import { create } from "zustand";

const useDeleteModal = create<DeleteModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;
