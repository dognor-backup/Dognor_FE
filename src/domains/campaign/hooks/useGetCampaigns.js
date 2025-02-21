import { useQuery } from "@tanstack/react-query";
import { getCampaigns } from "../api/campaign";

export const useGetCampaigns = (postdata) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campaign", postdata],
    queryFn: async () => {
      const response = await getCampaigns(postdata);
      return response;
    },
  });
  return { data, isLoading, isError };
};
