import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";
import { useGetCampaigns } from "@/domains/campaign/hooks/useGetCampaigns";
import TagCard from "@/shared/components/cards/tagcard/TagCard";

//캠페인
export default function TagCardsHome() {
  const { userId, userSeq } = useGetUserId();
  const { data: campaignArray } = useGetCampaigns({ userSeq: userSeq ?? 1, page: 1, size: 3 });
  const campaignLists = campaignArray?.data;
  return (
    <>
      {campaignLists?.map((campaign) => (
        <TagCard campaign={campaign} useHome={true}></TagCard>
      ))}
    </>
  );
}
