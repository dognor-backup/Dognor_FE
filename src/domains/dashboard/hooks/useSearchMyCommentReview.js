import { useMutation } from "@tanstack/react-query";
import { searchMyCommentReview } from "../api/myPostApi";

export const useSearchMyCommentReview = () => {
  return useMutation({
    mutationFn: searchMyCommentReview,
  });
};