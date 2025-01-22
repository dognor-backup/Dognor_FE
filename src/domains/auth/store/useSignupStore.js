import { create } from "zustand";

export const useIdCheckStore = create((set) => ({
  checkedId: {
    msg: "",
    code: null,
    data: null,
  },
  setUserId: (status) => set({ checkedId: { ...status } }),
}));

export const useEmailCheckStore = create((set) => ({
  emailCode: {
    msg: "",
    code: null,
    data: null,
  },
  setECode: (status) => set({ emailCode: { ...status } }),
}));

export const useSignupStore = create((set) => ({
  registInfo: {
    msg: "",
    code: null,
    data: null,
  },
  setRegistInfo: (status) => set({ registInfo: { ...status } }),
}));
