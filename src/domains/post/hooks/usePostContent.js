import { useMutation } from "@tanstack/react-query";
import { post } from "../api/post";
import { useNavigate } from "react-router-dom";

export const usePostContent = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: post,
    onSuccess: async ({ success, data }) => {
      if (success) {
        navigate("/community", { replace: true });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
