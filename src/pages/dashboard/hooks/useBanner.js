import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBannerList } from "../api/dashboard";

export function useBannerMutations() {
  const queryClient = useQueryClient();
  const invalidateCampaignQuery = () => queryClient.invalidateQueries({ queryKey: ["banner"] });

  const saveBannerMutation = useMutation({
    mutationFn: getBannerList,
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log(data);
        invalidateCampaignQuery();
      }
    },
  });
  return { saveBannerMutation };
}
