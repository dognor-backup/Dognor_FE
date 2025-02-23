import { useMutation } from "@tanstack/react-query";
import { searchDonationStories } from "../api/donationStory";

export const useSearchDonationStories = (setShowcaseList) => {
  return useMutation({
    mutationFn: searchDonationStories,
    onSuccess: ({ success, data }) => {
      if (success) {
        setShowcaseList(data);
      } else {
        console.log("error");
      }
    },
  });
};
