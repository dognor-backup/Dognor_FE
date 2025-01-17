import useUserStore from "@/domains/auth/store/useUserStore";
import { useSearchDonationStories } from "@/domains/donationstory/hooks/useSearchDonationStories";
import PostCard from "@/shared/components/cards/postcard/PostCard";
import TagCard from "@/shared/components/cards/tagcard/TagCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [showcaseList, setShowcaseList] = useState([]);
  const mutation = useSearchDonationStories(setShowcaseList);
  const { user } = useUserStore();
  console.log(user.userData.userSeq);
  useEffect(() => {
    mutation.mutate({
      searchParam: {
        page: 1,
        sortByHitCnt: false,
        sortByLatest: true,
        myPostsOnly: false,
        userSeq: user.userData.userSeq,
      },
    });
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {showcaseList.map((story) => (
          <PostCard
            key={story.donationStorySeq}
            story={story}
            handleEdit={() => console.log("수정 클릭!")}
            handleDelete={() => console.log("삭제 클릭!")}
          />
        ))}
        <TagCard />
      </div>
    </>
  );
}
