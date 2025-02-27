import { useEffect, useState } from "react";
import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";
import { getRandomCard } from "../hooks/getRandomCard";
import { useSearchDonationStories } from "@/domains/donationstory/hooks/useSearchDonationStories";
import PostCard from "@/shared/components/cards/postcard/PostCard";
import { MOCK_DATA } from "../data/defaultData";

export default function PostCardsHome({ ...props }) {
  const [showcaseList, setShowcaseList] = useState([]);
  const { userSeq } = useGetUserId();
  const data = {
    searchParam: {
      page: 1,
      size: 10,
      sortByHitCnt: true,
      sortByLatest: true,
      myPostsOnly: true,
      userSeq: userSeq,
    },
  };
  const donationCardMutation = useSearchDonationStories(setShowcaseList);
  useEffect(() => {
    donationCardMutation.mutate(data);
  }, []);
  const arrLength = showcaseList?.length || 0;
  const confirmList = arrLength === 0 ? setShowcaseList(MOCK_DATA) : getRandomCard(arrLength, showcaseList);

  return (
    <>
      {confirmList?.map((showcase, idx) => (
        <span key={idx} {...props}>
          <PostCard story={showcase} useHome={true}></PostCard>
        </span>
      ))}
    </>
  );
}
