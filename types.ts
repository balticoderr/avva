export interface DeleteModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface Address {
  id: string;
  title: string;
  codes: string;
  details?: string;
  image_path: string;
}
