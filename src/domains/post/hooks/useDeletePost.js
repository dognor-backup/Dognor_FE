import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, deleteSelectedPosts } from "../api/post";
import usePostStore from "../store/usePostStore";

//여러개 포스트 삭제
export const useDeletePostsMutation = (division) => {
  const queryClient = useQueryClient();
  const { setPostData, setNoticeData } = usePostStore();
  return useMutation({
    mutationFn: deleteSelectedPosts,
    onSuccess: async ({ success }) => {
      if (success) {
        const queryKey = division === "notice" ? "notice" : "post";
        await queryClient.invalidateQueries([queryKey]);
        const updatedPosts = queryClient.getQueryData([queryKey]);
        queryKey === "notice" ? setNoticeData(updatedPosts) : setPostData(updatedPosts);
      }
    },
  });
};

//단건 포스트 삭제
export const useDeleteTargetPostMutation = (division) => {
  const queryClient = useQueryClient();
  const { setPostData, setNoticeData } = usePostStore();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async ({ success }) => {
      if (success) {
        const queryKey = division === "notice" ? "notice" : "post";
        await queryClient.invalidateQueries([queryKey]);
        const updatedPosts = queryClient.getQueryData([queryKey]);
        queryKey === "notice" ? setNoticeData(updatedPosts) : setPostData(updatedPosts);
      }
    },
  });
};
