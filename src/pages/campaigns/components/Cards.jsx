import TagCard from "@/shared/components/cards/tagcard/TagCard";
import { useGetCampaigns } from "@/domains/campaign/hooks/useGetCampaigns";
import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";

export function Cards() {
  const { userSeq } = useGetUserId();
  const { data: campaign, error, isLoading } = useGetCampaigns({ userSeq, page: 1, size: 1 });
  //   const campaign = useGetCampaigns();
  //   return <TagCard key={campaign.camPaignSeq} campaign={campaign} />;
}
