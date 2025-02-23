import { deleteCampaign, editCampaign, likeCampaign, saveCampaign } from "@/domains/campaign/api/campaign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCampaignMutations() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateCampaignMutation = useMutation({
    mutationFn: saveCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        navigate("/campaigns");
      }
    },
  });

  const editCampaignMutation = useMutation({
    mutationFn: editCampaign,
    onSuccess: ({ success, data }) => {
      if (success) {
        console.log(data);
        navigate(`/campaign/${camPaignSeq}`);
      }
    },
  });

  const likeCampaignMutation = useMutation({
    mutationFn: likeCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["campaign"] });
      }
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["campaign"] });
        navigate(-1);
      }
    },
  });

  return { updateCampaignMutation, editCampaignMutation, likeCampaignMutation, deleteCampaignMutation };
}
