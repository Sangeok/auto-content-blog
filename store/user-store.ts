import { create } from "zustand";

interface UserType {
    isAdmin  : boolean;
    loginAdmin : () => void;
    logOutAdmin : () => void;
}

export const userStore = create<UserType>((set) => ({
    isAdmin : false,
    loginAdmin : () => set({ isAdmin : true }),
    logOutAdmin : () => set({ isAdmin : false }),
}));