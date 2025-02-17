import { useMutation } from "@tanstack/react-query";
import { searchCommunityPosts } from "../api/communityPostApi";

/**
 * 커뮤니티 게시글 검색을 수행하는 React Query 훅
 * @param {Function} setCommunityPosts - 검색 결과를 저장할 상태 함수
 */
export const useSearchCommunityPosts = (setCommunityPosts) => {
  return useMutation({
    mutationFn: searchCommunityPosts,
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log(data);
        setCommunityPosts(data);
      } else {
        console.log("검색 실패");
      }
    },
  });
};
