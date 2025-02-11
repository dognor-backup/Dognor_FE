import { useQuery } from "@tanstack/react-query";
import { postSearch } from "../api/post";
import usePostStore from "../store/usePostStore";

export function useGetPostList(getCategoryList) {
  const { setPostData } = usePostStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", getCategoryList],
    queryFn: async () => {
      const response = await postSearch(getCategoryList);
      return response;
    },
  });

  return { data, isLoading, isError };
}

export function useGetNoticeList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => {
      const response = await postSearch();
      return response;
    },
  });
  return { data, isLoading, isError };
}
