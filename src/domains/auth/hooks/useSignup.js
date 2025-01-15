import { useMutation } from "@tanstack/react-query";
import { checkDuplicate } from "../api/register";
import { useIdCheckStore } from "../store/useSignupStore";

// 조건이 모두 맞으면 (양식을 전부 입력, 유효성 검사 true) 데이터를 서버로 보내고,
//성공하면 메인페이지로 실패하면 에러메세지

//아이디 중복 확인
export const useCheckDuplicate = () => {
  const { setUserId } = useIdCheckStore();
  return useMutation({
    mutationFn: checkDuplicate,
    onSuccess: ({ success, data }) => {
      console.log(success);
      console.log("받아온 !", data);
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
