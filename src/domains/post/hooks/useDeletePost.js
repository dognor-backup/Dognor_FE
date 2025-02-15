import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSelectedPosts } from "../api/post";
import usePostStore from "../store/usePostStore";

export const useDeleteMutation = (division) => {
  const queryClient = useQueryClient();
  const { setPostData, setNoticeData } = usePostStore();

  return useMutation({
    mutationFn: deleteSelectedPosts,
    onSuccess: async ({ success }) => {
      if (success) {
        const queryKey = division === "notice" ? "notice" : "post";
        await queryClient.invalidateQueries([queryKey]);
        const updatedPosts = queryClient.getQueryData([queryKey]);
        queryKey === noticce ? setNoticeData(updatedPosts) : setPostData(updatedPosts);
      }
    },
  });
};
