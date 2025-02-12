import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../api/post";
import { useNavigate } from "react-router-dom";
import usePostStore from "../store/usePostStore";

export const usePostContent = (selectedCategory) => {
  console.log("ㄴㄴㄴ", selectedCategory);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setPostData } = usePostStore();

  return useMutation({
    mutationFn: post,
    onSuccess: async ({ success, data }) => {
      if (success) {
        await queryClient.invalidateQueries({ queryKey: ["post"] });
        const updatedPosts = queryClient.getQueryData(["post"]);
        setPostData(updatedPosts);
        navigate(`/community${selectedCategory && `/${selectedCategory}`}`, { replace: true });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
