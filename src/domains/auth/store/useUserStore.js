import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    userSeq: null,
    userId: "",
    userRole: "",
    name: "",
    accessTokken: "",
  },
  setUser: (userData) => set({ user: { userData } }),
  resetUser: () => {
    set({
      user: {
        userSeq: null,
        userId: "",
        userRole: "",
        name: "",
        accessTokken: "",
      },
    });
  },
}));

export default useUserStore;
