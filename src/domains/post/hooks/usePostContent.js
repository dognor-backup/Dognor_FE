import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../api/post";
import { useNavigate } from "react-router-dom";
import usePostStore from "../store/usePostStore";

export const usePostContent = (selectedCategory) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setPostData } = usePostStore();
  return useMutation({
    mutationFn: post,
    onSuccess: async ({ success }) => {
      if (success) {
        const queryKey = !selectedCategory ? "notice" : "post";
        await queryClient.invalidateQueries({ queryKey: [queryKey] });
        const updatedPosts = queryClient.getQueryData([queryKey]);
        setPostData(updatedPosts);
        navigate(`/community${selectedCategory && `/${selectedCategory}`}`, { replace: true });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
