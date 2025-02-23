import { editCampaign, saveCampaign } from "@/domains/campaign/api/campaign";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCampaignMutations() {
  const navigate = useNavigate();
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
  return { updateCampaignMutation, editCampaignMutation };
}
