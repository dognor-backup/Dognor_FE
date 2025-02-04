import { useMutation } from "@tanstack/react-query";
import { postSearch } from "../api/post";
import usePostStore from "../store/usePostStore";

export const useGetPostList = () => {
  const { postsData, setPostData } = usePostStore();
  return useMutation({
    mutationFn: postSearch,
    onSuccess: async ({ success, data }) => {
      console.log(data);
      if (success) {
        const { data: nestedData } = data;
        setPostData(nestedData);
        console.log(postsData);
      }
    },
  });
};
