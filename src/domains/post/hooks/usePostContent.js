import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post, postEdit } from "../api/post";
import { useNavigate } from "react-router-dom";
import usePostStore from "../store/usePostStore";

export const usePostContent = (targetPath) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setPostData, setNoticeData } = usePostStore();
  return useMutation({
    mutationFn: post,
    onSuccess: async ({ success }) => {
      if (success) {
        const queryKey = !targetPath ? "notice" : "post";
        await queryClient.invalidateQueries({ queryKey: [queryKey] });
        const updatedPosts = queryClient.getQueryData([queryKey]);
        queryKey === "notice" ? setNoticeData(updatedPosts) : setPostData(updatedPosts);
        navigate(`/community${targetPath && `/${targetPath}`}`, { replace: true });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useEditPost = (targetPath) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setPostData, setNoticeData } = usePostStore();
  return useMutation({
    mutationFn: postEdit,
    onSuccess: async ({ success }) => {
      if (success) {
        const queryKey = !targetPath ? "notice" : "post";
        await queryClient.invalidateQueries({ queryKey: [queryKey] });
        const updatedPosts = queryClient.getQueryData([queryKey]);
        console.log("up", updatedPosts);
        queryKey === "notice" ? setNoticeData(updatedPosts) : setPostData(updatedPosts);
        navigate(`/community${targetPath && `/${targetPath}`}`, { replace: true });
      }
    },
  });
};
