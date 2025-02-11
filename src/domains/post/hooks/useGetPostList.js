import { useQuery } from "@tanstack/react-query";
import { postSearch } from "../api/post";
import usePostStore from "../store/usePostStore";
import { useEffect } from "react";

//카테고리 불러오기
export function useGetPostList(getCategoryList) {
  const { setPostData } = usePostStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", getCategoryList],
    queryFn: async () => {
      const response = await postSearch(getCategoryList);
      return response;
    },
  });
  useEffect(() => {
    if (data?.data) {
      const { msg, code, data: nestedData } = data.data;
      setPostData(nestedData);
    }
  }, [data, setPostData]);

  return { data, isLoading, isError };
}

//공지사항 불러오기
export function useGetNoticeList(getCategoryList) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notice"],
    queryFn: async () => {
      const response = await postSearch(getCategoryList);
      return response;
    },
  });
  return { data, isLoading, isError };
}
