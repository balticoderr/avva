import { create } from "zustand";

interface UpdateModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateModal = create<UpdateModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateModal;
