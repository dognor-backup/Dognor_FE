import { useMutation } from "@tanstack/react-query";
import { searchMyPost } from "../api/myPostApi";


export const useSearchMyPost = () => {
  return useMutation({
    mutationFn: searchMyPost,
  });
};
