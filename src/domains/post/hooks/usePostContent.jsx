import { useMutation } from "@tanstack/react-query";
import { post } from "../api/post";
import { useNavigate } from "react-router-dom";

export const usePostContent = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: post,
    onSuccess: async ({ success, data }) => {
      //게시글 작성 성공
      if (success) {
        console.log(data);
        navigate("/community", { replace: true });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
