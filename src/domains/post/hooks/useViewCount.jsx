import { useMutation } from "@tanstack/react-query";
import { viewCount } from "@/domains/post/api/post";
import { useInvalidateUpdatePost } from "./useInvalidateUpdatePost";

export function useViewCount(key) {
  const invalidateUpdatePost = useInvalidateUpdatePost();
  return useMutation({
    mutationFn: viewCount,
    onSuccess: async ({ success }) => {
      if (success) {
        await invalidateUpdatePost(key);
      }
    },
  });
}
