import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../api/post";

export const useDeleteMutation = (postSeq) => {
  return useMutation({
    mutationFn: deletePost,
  });
};
