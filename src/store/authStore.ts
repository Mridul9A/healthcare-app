import { create } from "zustand";

type AuthStore = {
  user: any | null | undefined;
  setUser: (user: any | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));