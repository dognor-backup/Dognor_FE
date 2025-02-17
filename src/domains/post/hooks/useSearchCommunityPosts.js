import { useMutation } from "@tanstack/react-query";
import { searchCommunityPosts } from "../api/communityPostApi";


export const useSearchCommunityPosts = () => {
  return useMutation({
    mutationFn: searchCommunityPosts,
  });
};
