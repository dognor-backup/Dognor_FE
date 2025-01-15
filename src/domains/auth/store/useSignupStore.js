import { create } from "zustand";

export const useIdCheckStore = create((set) => ({
  duplicateId: {
    msg: "",
    code: null,
    data: null,
  },
  setUserId: (status) => {
    set({ duplicateId: { ...status } });
  },
}));

export const useSignupStore = create((set) => ({
  register: {
    userId: "",
    pw: "",
    name: "",
    phone: "",
    email: "",
    userRole: "",
    hospital: {
      hospitalName: "",
      representativeName: "",
      address: "",
      addressDetail: "",
      postalCode: "",
      hospitalPhone: "",
      agreement1: null,
      donationYn: null,
      donationFreeYn: null,
    },
    agreement1: null,
    agreement2: null,
    agreement3: null,
    agreement4: null,
    agreement5: null,
  },
  setRegister: (registerData) =>
    set((state) => ({
      register: { ...state.register, ...registerData },
    })),
}));
