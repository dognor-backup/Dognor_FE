import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";
import { useGetCampaigns } from "@/domains/campaign/hooks/useGetCampaigns";
import TagCard from "@/shared/components/cards/tagcard/TagCard";
import { getRandomCard } from "../../../shared/utils/getRandomCard";

export default function TagCardsHome({ ...props }) {
  const { userSeq } = useGetUserId();
  const { data: campaignArray } = useGetCampaigns(
    { userSeq: userSeq ?? 0, page: 1, size: 9 },
    { staleTime: 1000 * 60 * 3 }
  );
  const campaignListsAll = campaignArray?.data ?? [];
  const arrLength = campaignListsAll?.length;
  const campaignLists = getRandomCard(arrLength, campaignListsAll);

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
