import { create } from "zustand";

//아이디 중복 확인
export const useIdCheckStore = create((set) => ({
  checkedId: {
    msg: "",
    code: null,
    data: null,
  },
  setUserId: (status) => set({ checkedId: { ...status } }),
}));

//이메일 인증 코드
export const useEmailCheckStore = create((set) => ({
  emailCode: {
    msg: "",
    code: null,
    data: null,
  },
  setECode: (status) => set({ emailCode: { ...status } }),
}));

//회원가입
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
