import { useMutation } from "@tanstack/react-query";
import { searchDonationStories } from "../api/donationStory";
import useUserStore from "@/domains/auth/store/useUserStore";

export const useSearchDonationStories = () => {
  const { user } = useUserStore();
  return useMutation({
    mutationFn: searchDonationStories,
    onSuccess: ({ success, data }) => {
      if (success) {
        const {
          donationStorySeq,
          cardImgUrl,
          likeCnt,
          LikeYn,
          name,
          profileImgUrl,
          firstSaveUser,
        } = data.data;
      } else {
        console.log("");
      }
    },

    onError: () => {
      console.log("");
    },
  });
};
