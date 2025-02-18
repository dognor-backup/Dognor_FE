import { useMutation } from "@tanstack/react-query";
import { deletePost, deleteSelectedPosts } from "../api/post";
import { useInvalidateUpdatePost } from "./useInvalidateUpdatePost";

export const useDeletePostsMutation = (key) => {
  const invalidateUpdatePost = useInvalidateUpdatePost();
  return useMutation({
    mutationFn: deleteSelectedPosts,
    onSuccess: async ({ success }) => {
      if (success) {
        invalidateUpdatePost(key);
      }
    },
  });
};

export const useDeleteTargetPostMutation = (key) => {
  const invalidateUpdatePost = useInvalidateUpdatePost();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async ({ success }) => {
      if (success) {
        invalidateUpdatePost(key);
      }
    },
  });
};
