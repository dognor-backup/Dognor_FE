import { useMutation } from "@tanstack/react-query";
import { savePatInfo } from "../api/pat";

export const useSavePatInfo = () => {
 return useMutation({
   mutationFn: savePatInfo,
   onSuccess: ({ success, data }) => {
     if (!success) {
       throw new Error(data?.msg || "정보 저장에 실패했습니다.");
     }
   }
 });
};