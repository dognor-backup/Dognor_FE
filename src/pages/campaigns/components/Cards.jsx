import TagCard from "@/shared/components/cards/tagcard/TagCard";
import { useGetCampaigns } from "@/domains/campaign/hooks/useGetCampaigns";
import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";

export function Cards() {
  const { userSeq } = useGetUserId();
  const { data: campaignList, error, isLoading } = useGetCampaigns({ userSeq: userSeq ?? 1, page: 1, size: 9 });
  const campaign = campaignList?.data;
  console.log(campaign);

  return (
    <>
      {campaign?.map((list) => (
        <TagCard key={list?.camPaignSeq} campaign={list} />
      ))}
    </>
  );
}
