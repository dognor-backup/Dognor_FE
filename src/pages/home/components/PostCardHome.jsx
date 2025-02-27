import { useEffect, useState } from "react";
import { useGetUserId } from "@/domains/auth/hooks/useGetUserId";
import { useSearchDonationStories } from "@/domains/donationstory/hooks/useSearchDonationStories";
import PostCard from "@/shared/components/cards/postcard/PostCard";
import { MOCK_DATA } from "../data/defaultData";

export default function PostCardsHome() {
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

  const confirmList = showcaseList.length === 0 ? setShowcaseList(MOCK_DATA) : showcaseList;

  return (
    <>
      {confirmList?.map((showcase, idx) => (
        <PostCard story={showcase} key={idx}></PostCard>
      ))}
    </>
  );
}
