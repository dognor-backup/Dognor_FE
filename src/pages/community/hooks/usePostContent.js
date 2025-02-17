import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { post, postEdit } from "../../../domains/post/api/post";
import { useInvalidateUpdatePost } from "./useInvalidateUpdatePost";

export const usePostContent = (key) => {
  const invalidateUpdatePost = useInvalidateUpdatePost();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: post,
    onSuccess: async ({ success }) => {
      if (success) {
        invalidateUpdatePost(key);
        navigate(`/community${key && `/${key}`}`, { replace: true });
      }
    },
  });
};

export const useEditPost = (key) => {
  const invalidateUpdatePost = useInvalidateUpdatePost();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postEdit,
    onSuccess: async ({ success }) => {
      if (success) {
        invalidateUpdatePost(key);
        navigate(`/community${key && `/${key}`}`, { replace: true });
      }
    },
  });
};
