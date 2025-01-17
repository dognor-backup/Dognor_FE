import { useMutation } from "@tanstack/react-query";
import { likeDonationStory } from "../api/donationStory";

export const useLikeDonationStory = () => {
  return useMutation({
    mutationFn: likeDonationStory,
    onSuccess: ({success}) => {
        if(success) {
            console.log("라이크 전송 성공")
        }
    }
  });
};
