import { useMutation } from "@tanstack/react-query";
import { updatePatInfo } from "../api/pat";

export const useUpdatePatInfo = () => {
  return useMutation({
    mutationFn: updatePatInfo,
    onError: (error) => {
      console.error("반려견 정보 수정 중 오류 발생:", error);
    }
  });
};