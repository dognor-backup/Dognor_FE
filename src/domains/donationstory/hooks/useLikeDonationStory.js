import { useMutation } from "@tanstack/react-query";
import { likeDonationStory } from "../api/donationStory";

export const useLikeDonationStory = () => {
  return useMutation({
    mutationFn: likeDonationStory,
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log("좋아요 요청 성공:", data);
      }
    },
    onError: (error) => {
      console.error("좋아요 요청 실패:", error);
    },
  });
};
