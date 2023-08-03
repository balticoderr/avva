import { create } from "zustand";

interface ExplainModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useExplainModal = create<ExplainModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useExplainModal;
