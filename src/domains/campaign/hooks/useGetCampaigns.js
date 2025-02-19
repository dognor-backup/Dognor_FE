import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../api/campaign";

export const useGetCampaigns = (setCampaignList) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campaign"],
    queryFn: async () => {
      const response = await getCampaigns(setCampaignList);
      console.log("캠페인", response);
      return setCampaignList(response);
    },
  });
  return { data, isLoading, isError };
};
