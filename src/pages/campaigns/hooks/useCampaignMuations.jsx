import { deleteCampaign, editCampaign, likeCampaign, saveCampaign } from "@/domains/campaign/api/campaign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCampaignMutations() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const invalidateCampaignQuery = () => queryClient.invalidateQueries({ queryKey: ["campaign"] });

  const updateCampaignMutation = useMutation({
    mutationFn: saveCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        invalidateCampaignQuery();
        navigate("/campaigns");
      }
    },
  });

  const editCampaignMutation = useMutation({
    mutationFn: editCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        invalidateCampaignQuery();
        navigate(`/campaigns`);
      }
    },
  });

  const likeCampaignMutation = useMutation({
    mutationFn: likeCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        invalidateCampaignQuery();
      }
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        invalidateCampaignQuery();
        navigate(-1);
      }
    },
  });

  return { updateCampaignMutation, editCampaignMutation, likeCampaignMutation, deleteCampaignMutation };
}
