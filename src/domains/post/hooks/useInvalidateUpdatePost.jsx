import usePostStore from "@/domains/post/store/usePostStore";
import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateUpdatePost(key) {
  const queryClient = useQueryClient();
  const { setPostData, setNoticeData } = usePostStore();
  return async (key) => {
    const queryKey = key;
    await queryClient.invalidateQueries([queryKey]);
    const updatedPosts = queryClient.getQueryData([queryKey]);
    if (queryKey === "notice") {
      return setNoticeData(updatedPosts);
    }
    if (queryKey === "post") {
      setPostData(updatedPosts);
    }
  };
}
