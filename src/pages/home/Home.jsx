import { useSearchDonationStories } from "@/domains/donationstory/hooks/useSearchDonationStories";
import PostCard from "@/shared/components/postcard/PostCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [showcaseList, setShowcaseList] = useState([]);
  const mutation = useSearchDonationStories(setShowcaseList);

  useEffect(() => {
    mutation.mutate({
      searchParam: {
        page: 1,
        sortByHitCnt: false,
        sortByLatest: true,
        myPostsOnly: false,
        userSeq: 1,
      },
    });
  }, []);

  useEffect(() => {
    console.log("데이터임", showcaseList);
  }, [showcaseList]);
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
      </div>
    </>
  );
}
