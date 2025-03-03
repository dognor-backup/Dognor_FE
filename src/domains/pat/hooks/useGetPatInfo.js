import { useQuery } from "@tanstack/react-query";
import { getPatInfo } from "../api/pat";


export const useGetPatInfo = (userSeq, page = 1, size = 4) => {
  return useQuery({
    queryKey: ["patInfo", userSeq, page, size],
    queryFn: async () => {
      if (!userSeq) {
        return { data: [], totalPage: 0 };
      }
      
      const response = await getPatInfo(userSeq, page, size);
      if (!response.success) {
        throw new Error(response.msg || "반려견 정보를 불러오는데 실패했습니다.");
      }
      
      return response;
    },
    enabled: Boolean(userSeq),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    keepPreviousData: true,
    initialData: { data: [], totalPage: 0 },
    onError: (error) => {
      console.error("반려견 정보 로딩 오류:", error.message);
    },
  });
};