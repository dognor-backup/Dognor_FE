import { useMutation } from "@tanstack/react-query";
import { postSearch } from "../api/post";
import usePostStore from "../store/usePostStore";

export const useGetPostList = () => {
  const { setPostData } = usePostStore();
  return useMutation({
    mutationFn: postSearch,
    onSuccess: async ({ success, data }) => {
      if (success) {
        const { data: nestedData } = data;
        console.log("ddd", nestedData);
        setPostData(nestedData);
      }
    },
  });
};
