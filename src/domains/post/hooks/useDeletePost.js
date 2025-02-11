import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSelectedPosts } from "../api/post";
import usePostStore from "../store/usePostStore";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  const { setPostData } = usePostStore();

  return useMutation({
    mutationFn: deleteSelectedPosts,
    onSuccess: async ({ success, data }) => {
      if (success) {
        await queryClient.invalidateQueries("post");
        const updatedPosts = queryClient.getQueryData(["post"]);
        setPostData(updatedPosts);
      }
    },
  });
};
