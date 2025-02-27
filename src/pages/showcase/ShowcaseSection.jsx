import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/components/buttons/Button";
import styled from "@emotion/styled";
import ShowcaseNoDataCard from "./ShowcaseNoDataCard";

import { DnPagination } from "@/shared/components/DnPagination";
import useUserStore from "@/domains/auth/store/useUserStore";

import PostCard from "@/shared/components/cards/postcard/PostCard";
import { searchDonationStories } from "@/domains/donationstory/api/donationStory";

export default function ShowcaseSection() {
  const { user } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByLatest, setSortByLatest] = useState(true);
  const [sortByHitCnt, setSortByHitCnt] = useState(false);
  const [myPostsOnly, setMyPostsOnly] = useState(false);
  const [userSeq, setUserSeq] = useState(null);

  useEffect(() => {
    if (user?.userData?.userSeq) {
      setUserSeq(user.userData.userSeq);
    }
  }, [user]);

  const fetchDonationStories = async () => {
    if (!userSeq) return { data: [], totalPage: 1 };

    const response = await searchDonationStories({
      searchParam: {
        page: currentPage,
        size: 15,
        sortByHitCnt,
        sortByLatest,
        myPostsOnly,
        userSeq,
      },
    });

    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["donationStories", currentPage, sortByLatest, sortByHitCnt, myPostsOnly, userSeq],
    queryFn: fetchDonationStories,
    enabled: !!userSeq,
    keepPreviousData: true,
  });

  useEffect(() => {
    console.log("API Response Data:", data);
  }, [data]);

  const handleSortChange = (type) => {
    if (type === "latest") {
      setSortByLatest(true);
      setSortByHitCnt(false);
      setMyPostsOnly(false);
    } else if (type === "hit") {
      setSortByLatest(false);
      setSortByHitCnt(true);
      setMyPostsOnly(false);
    } else {
      setSortByLatest(false);
      setSortByHitCnt(false);
      setMyPostsOnly(true);
    }
  };

  return (
    <ShowcaseSectionLayout>
      <FilterContainer>
        <Button variant="normal" size="small" state="outline" onClick={() => handleSortChange("latest")}>
          최신순
        </Button>
        <Button variant="normal" size="small" state="outline" onClick={() => handleSortChange("hit")}>
          조회순
        </Button>
        <Button variant="normal" size="small" state="outline" onClick={() => handleSortChange("mine")}>
          내 작성글
        </Button>
      </FilterContainer>

      {isLoading ? (
        <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
      ) : data?.length > 0 ? (
        <ShowcaseCardContainer>
          {data.map((story) => (
            <PostCard key={story.donationStorySeq} story={story} />
          ))}
        </ShowcaseCardContainer>
      ) : (
        <ShowcaseNoDataContainer>
          <ShowcaseNoDataCard color="primary" text="“첫 번째의 <br/> 헌혈견 동료가 되어주세요”" />
          <ShowcaseNoDataCard color="secondary" text="“반려견의<br/> 멋진 모습 자랑해주세요”" />
          <ShowcaseNoDataCard color="red" text="헌혈견 도장 꽝꽝꽝<br/> 우리도 헌혈 했어요!" />
        </ShowcaseNoDataContainer>
      )}

      <DnPagination totalPage={data?.totalPage || 1} getClickedPageNumber={setCurrentPage} />
    </ShowcaseSectionLayout>
  );
}

const ShowcaseSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ShowcaseCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const ShowcaseNoDataContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.neutrals_05};
`;
