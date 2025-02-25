import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";
import { useGetCampaigns } from "@/domains/campaign/hooks/useGetCampaigns";
import TagCard from "@/shared/components/cards/tagcard/TagCard";

//캠페인
export default function TagCardsHome({ ...props }) {
  const { userSeq } = useGetUserId();
  const { data: campaignArray } = useGetCampaigns(
    { userSeq: userSeq ?? 0, page: 1, size: 9 },
    { staleTime: 1000 * 60 * 3 }
  );
  const campaignListsAll = campaignArray?.data ?? [];
  const arrLength = campaignListsAll?.length;
  const getRamdomCard = (len, arr) => {
    if (len < 3) return arr;
    const randomIndex = Math.floor(Math.random() * (len - 2));
    return arr.slice(randomIndex, randomIndex + 3);
  };
  const campaignLists = getRamdomCard(arrLength, campaignListsAll);

  return (
    <>
      {campaignLists?.map((campaign) => (
        <span key={campaign.camPaignSeq} {...props}>
          <TagCard campaign={campaign} useHome={true}></TagCard>
        </span>
      ))}
    </>
  );
}
