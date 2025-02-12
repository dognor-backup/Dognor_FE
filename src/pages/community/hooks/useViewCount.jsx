import { viewCount } from "@/domains/post/api/post";
import usePostStore from "@/domains/post/store/usePostStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useViewCount(setViewCountData) {
  const { updateHitCount } = usePostStore;
  const queryClient = useQueryClient();
  const { setPostData } = usePostStore();
  return useMutation({
    mutationFn: viewCount,
    onSuccess: async ({ success, data }) => {
      if (success) {
        await queryClient.invalidateQueries("post");
        const updatedPosts = queryClient.getQueryData(["post"]);
        setPostData(updatedPosts);
      }
    },
  });
}
