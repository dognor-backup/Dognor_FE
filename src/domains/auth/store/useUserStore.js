import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    userData: {
      userSeq: null,
      userId: "",
      userRole: "",
      name: "",
      accessTokken: "",
    },
  },
  setUser: (userData) => set({ user: { userData } }),
  resetUser: () => {
    set({
      user: {
        userData: {
          userSeq: null,
          userId: "",
          userRole: "",
          name: "",
          accessTokken: "",
        },
      },
    });
  },
}));

export default useUserStore;
