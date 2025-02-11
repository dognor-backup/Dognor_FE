import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../api/post";
import { useNavigate } from "react-router-dom";

export const usePostContent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setPostData } = usePostStore();
  return useMutation({
    mutationFn: post,
    onSuccess: async ({ success, data }) => {
      if (success) {
        queryClient.invalidateQueries("posts");
        const updatedPosts = await fetchPostsFromServer();
        setPostData(updatedPosts);
        navigate("/community", { replace: true });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
