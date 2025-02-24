import { useMutation } from "@tanstack/react-query";
import { getCampaigns } from "../api/campaign";


export const useGetCampaigns = (setCampaignList) => {
  return useMutation({
    mutationFn: getCampaigns,
    onSuccess: ({ success, data }) => {
      if (success) {
        setCampaignList(data); 
      } else {
        console.log("Error: API 요청에 실패했습니다.");
      }
    },
    onError: (error) => {
      console.error("Error 발생:", error);
    },
  });
};
