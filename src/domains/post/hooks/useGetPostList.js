import { useQuery } from "@tanstack/react-query";
import { postSearch } from "../api/post";

//카테고리 불러오기
export function useGetPostList(getCategoryList) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", getCategoryList],
    queryFn: async () => {
      const response = await postSearch(getCategoryList);
      return response;
    },
  });
  return { data, isLoading, isError };
}

//공지사항 불러오기
export function useGetNoticeList(getCategoryList) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notice", getCategoryList],
    queryFn: async () => {
      return postSearch(getCategoryList);
    },
  });
  return { data, isLoading, isError };
}
