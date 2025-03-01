import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    userData: {
      userSeq: null,
      userId: "",
      userRole: "",
      name: "",
      accessToken: "",
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
          accessToken: "",
        },
      },
    });
  },
}));

export default useUserStore;
