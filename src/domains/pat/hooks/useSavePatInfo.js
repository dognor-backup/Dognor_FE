import { useMutation } from "@tanstack/react-query";
import { savePatInfo } from "../api/pat";

export const useSavePatInfo = () => {
  return useMutation({
    mutationFn: savePatInfo,
    onSuccess: async ({ success, data }) => {
      if (success) {
        console.log(data);
      } else {
        console.log(success, data)
        console.log("error임");
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
