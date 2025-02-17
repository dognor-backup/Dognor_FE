import { useMutation } from "@tanstack/react-query";
import { deletePost, deleteSelectedPosts } from "../../../domains/post/api/post";
import { useInvalidateUpdatePost } from "./useInvalidateUpdatePost";

//여러개 포스트 삭제
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

//단건 포스트 삭제
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
