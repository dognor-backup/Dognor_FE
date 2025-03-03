import { deleteComment, editComment, updateComment } from "@/domains/post/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["comment"] });
      }
    },
  });
};

export const deleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["comment"] });
      }
    },
  });
};

export const editCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editComment,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries(["comment"]);
      }
    },
  });
};
