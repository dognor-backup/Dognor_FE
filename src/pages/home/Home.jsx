import useUserStore from "@/domains/auth/store/useUserStore";
import { useGetCampaigns } from "@/domains/campaign/hooks/useGetCampaigns";
import { useSearchDonationStories } from "@/domains/donationstory/hooks/useSearchDonationStories";
import PostCard from "@/shared/components/cards/postcard/PostCard";
import TagCard from "@/shared/components/cards/tagcard/TagCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [showcaseList, setShowcaseList] = useState([]);
  const [campaignList, setCampaignList] = useState([
    {
      camPaignSeq: 1,
      imgUrl: "http://domain.com/img/img.png",
      title: "title",
      detail: "content",
      likeCnt: 3,
      likeYn: true,
      strDate: "2024-12-10",
      endDate: "2024-12-10",
      keyword1: "키워드",
      keyword2: "키워드",
      keyword3: "키워드",
    },
  ]);
  const mutation = useSearchDonationStories(setShowcaseList);
  const shitmutation = useGetCampaigns(setCampaignList);
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

  // useEffect(() => {
  //   shitmutation.mutate({
  //     searchParam: {
  //       page: 1,
  //       userSeq: user.userData.userSeq,
  //     },
  //   });
  // }, []);

  // const handleFetchCampaigns = () => {
  //   const params = { page: 1, userSeq: user.userData.userSeq, campaign }; // 요청 파라미터
  //   shitmutation.mutate(params); // API 요청 실행
  // };

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
        {/* {showcaseList.map((story) => (
          <PostCard
            key={story.donationStorySeq}
            story={story}
            handleEdit={() => console.log("수정 클릭!")}
            handleDelete={() => console.log("삭제 클릭!")}
          />
        ))} */}

        {campaignList.map((campaign) => (
          <TagCard
          key={campaign.camPaignSeq}
          campaign={campaign}
          handleEdit={()=> {console.log("수정")}}
          handleDelete={()=>{console.log("삭제")}}
          />
        ))}
  
        
      </div>
    </>
  );
}
