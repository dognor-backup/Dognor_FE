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

//회원가입 요청
export const useSignupStore = create((set) => ({
  registInfo: {
    msg: "",
    code: null,
    data: {},
  },
  setRegistInfo: (status) => set({ registInfo: { ...status } }),
}));
