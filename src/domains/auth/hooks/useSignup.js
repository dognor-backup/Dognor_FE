import { useMutation } from "@tanstack/react-query";
import { checkDuplicate, checkUserEmail } from "../api/register";
import { useEmailCheckStore, useIdCheckStore } from "../store/useSignupStore";

// 조건이 모두 맞으면 (양식을 전부 입력, 유효성 검사 true) 데이터를 서버로 보내고,
//성공하면 메인페이지로 실패하면 에러메세지

//아이디 중복 확인
export const useCheckDuplicate = () => {
  const { setUserId } = useIdCheckStore();
  return useMutation({
    mutationFn: checkDuplicate,
    onSuccess: ({ success, data }) => {
      if (success) {
        const { msg, code, data: nestedData } = data;
        setUserId({ msg, code, data: nestedData });
      } else {
        console.log("Error");
      }
    },
    onError: () => {
      console.log("error!!!");
    },
  });
};

export const useVerifyEmail = () => {
  const { setECode } = useEmailCheckStore();
  return useMutation({
    mutationFn: checkUserEmail,
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log("이메일인증", data);
        const { msg, code, data: nestedData } = data;
        setECode({ msg, code, data: nestedData });
      } else {
        console.log("error");
      }
    },
    onError: () => {
      console.log("error!!!");
    },
  });
};
