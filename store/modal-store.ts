import { create } from "zustand";

export type openModalType = "login" | "post";

interface ModalType {
    type : openModalType | null;
    isOpen : boolean;
    onOpen : (type:openModalType) => void;
    onClose : () => void;
}

export const modalStore = create<ModalType>((set) => ({
    type : null,
    isOpen : false,
    onOpen : (type) => set({ isOpen : true, type }),
    onClose : () => set({ isOpen : false, type : null })
}));