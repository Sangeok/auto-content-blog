import { create } from "zustand";

interface ModalType {
    isOpen : boolean;
    onOpen : () => void;
    onClose : () => void;
}

export const modalStore = create<ModalType>((set) => ({
    isOpen : false,
    onOpen : () => set({ isOpen : true }),
    onClose : () => set({ isOpen : false })
}));