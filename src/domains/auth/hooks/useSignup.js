import { useMutation } from "@tanstack/react-query";
import { checkDuplicate, checkUserEmail, registerUser } from "../api/register";
import { useEmailCheckStore, useIdCheckStore, useSignupStore } from "../store/useSignupStore";
import { useNavigate } from "react-router-dom";

export const useCheckDuplicate = (setErrors, setIsUserIdVerified) => {
  const { setUserId } = useIdCheckStore();
  return useMutation({
    mutationFn: checkDuplicate,
    onSuccess: ({ success, data }) => {
      if (success) {
        const { msg, code, data: nestedData } = data;
        setUserId({ msg, code, data: nestedData });
        setIsUserIdVerified(nestedData);
        setErrors((prev) => ({
          ...prev,
          userId: nestedData ? "이미 존재하는 아이디 입니다" : "사용 가능한 아이디 입니다",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          userId: "중복 확인에 실패했습니다. 다시 시도해주세요.",
        }));
      }
    },
    onError: (error) => {
      setErrors((prev) => ({
        ...prev,
        userId: "다시 시도해주세요.",
      }));
    },
  });
};

export const useVerifyEmail = (setErrors) => {
  const { setECode } = useEmailCheckStore();
  return useMutation({
    mutationFn: checkUserEmail,
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log("이메일인증", data);
        const { msg, code, data: nestedData } = data;
        setECode({ msg, code, data: nestedData });
      } else {
        setErrors((prev) => ({
          ...prev,
          userId: "다시 확인해주세요.",
        }));
      }
    },
    onError: () => {
      setErrors((prev) => ({
        ...prev,
        userId: "다시 시도해주세요.",
      }));
    },
  });
};

export const useUserRegist = () => {
  const navigate = useNavigate();
  const { setRegistInfo } = useSignupStore();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: ({ success, data }) => {
      if (success) {
        const { msg, code, data: nestedData } = data;
        setRegistInfo({ msg, code, data: nestedData });
        navigate("/welcome", { replace: true });
      } else {
        console.log("회원가입에 실패");
      }
    },
    onError: (error) => {
      console.log("회원가입에 실패");
    },
  });
};
