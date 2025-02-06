import { useQuery } from "@tanstack/react-query";
import { getPatInfo } from "../api/pat";

export const useGetPatInfo = (userSeq, page, size) => {
  return useQuery({
    queryKey: ["patInfo", userSeq, page, size],
    queryFn: () => getPatInfo(userSeq, page, size),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!userSeq,
  });
};
