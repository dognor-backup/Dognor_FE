import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/shared/components/buttons/Button";
import styled from "@emotion/styled";
import ShowcaseNoDataCard from "./ShowcaseNoDataCard";
import { DnPagination } from "@/shared/components/DnPagination";
import useUserStore from "@/domains/auth/store/useUserStore";
import PostCard from "@/shared/components/cards/postcard/PostCard";
import {
  searchDonationStories,
  deleteDonationStory,
} from "@/domains/donationstory/api/donationStory";
import useAlertStore from "@/shared/hooks/useAlertStore";
import DelAlert from "@/shared/components/alert/DelAlert";
import useModalStore from "@/shared/hooks/useModalStore";
import EditDonationStoryModal from "./EditDonationStoryModal";

export default function ShowcaseSection() {
  const { user } = useUserStore();
  const { openAlert, isAlertOpen, deleteType, deleteTargetSeq } = useAlertStore();
  const { openModal } = useModalStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByLatest, setSortByLatest] = useState(true);
  const [sortByHitCnt, setSortByHitCnt] = useState(false);
  const [myPostsOnly, setMyPostsOnly] = useState(false);
  const [userSeq, setUserSeq] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

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

    return {
      data: response.data,
      totalPage: response.totalPage || 1,
    };
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "donationStories",
      currentPage,
      sortByLatest,
      sortByHitCnt,
      myPostsOnly,
      userSeq,
    ],
    queryFn: fetchDonationStories,
    enabled: !!userSeq,
    keepPreviousData: true,
  });

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

  const deleteMutation = useMutation({
    mutationFn: deleteDonationStory,
    onSuccess: (response) => {
      if (response.success) {
        refetch();
      } else {
        alert(response.msg || "헌혈 이야기 삭제에 실패했습니다.");
      }
      setIsDeleting(false);
    },
    onError: () => {
      alert("삭제 중 오류가 발생했습니다.");
      setIsDeleting(false);
    },
  });

  const handleDelete = (donationStorySeq) => {
    openAlert("donationStory", donationStorySeq);
  };

  const handleEdit = (story) => {
    setSelectedStory(story);
    openModal("editDonationStory");
  };

  const confirmDelete = async () => {
    if (!deleteTargetSeq || deleteType !== "donationStory") return;

    setIsDeleting(true);
    deleteMutation.mutate(deleteTargetSeq);
  };

  const handlePageChange = (pageNumber) => {
    const totalPages = data?.totalPage || 1;
    const newPage = Number(pageNumber);
    
    if (newPage < 1) {
      setCurrentPage(1);
    } else if (newPage > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(newPage);
    }
  };

  return (
    <ShowcaseSectionLayout>
      <FilterContainer>
        <Button
          variant="normal"
          size="small"
          state={sortByLatest ? "default" : "outline"}
          onClick={() => handleSortChange("latest")}
        >
          최신순
        </Button>
        <Button
          variant="normal"
          size="small"
          state={sortByHitCnt ? "default" : "outline"}
          onClick={() => handleSortChange("hit")}
        >
          조회순
        </Button>
        <Button
          variant="normal"
          size="small"
          state={myPostsOnly ? "default" : "outline"}
          onClick={() => handleSortChange("mine")}
        >
          내 작성글
        </Button>
      </FilterContainer>

      {isLoading || isDeleting ? (
        <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
      ) : data?.data?.length > 0 ? (
        <ShowcaseCardContainer>
          {data.data.map((story) => (
            <PostCard
              key={story.donationStorySeq}
              story={story}
              handleDelete={() => handleDelete(story.donationStorySeq)}
              handleEdit={() => handleEdit(story)}
            />
          ))}
        </ShowcaseCardContainer>
      ) : (
        <ShowcaseNoDataContainer>
          <ShowcaseNoDataCard
            color="primary"
            text='"첫 번째의<br/>헌혈견 동료가 되어주세요"'
          />
          <ShowcaseNoDataCard
            color="secondary"
            text='"반려견의<br/>멋진 모습 자랑해주세요"'
          />
          <ShowcaseNoDataCard
            color="red"
            text="헌혈견 도장 꽝꽝꽝<br/>우리도 헌혈 했어요!"
          />
        </ShowcaseNoDataContainer>
      )}
      
      <PaginationContainer>
        <DnPagination
          totalPage={data?.totalPage || 1}
          currentPage={currentPage}
          getClickedPageNumber={handlePageChange}
        />
      </PaginationContainer>

      <DelAlert isAlertOpen={isAlertOpen} func={confirmDelete}>
        헌혈 이야기를 삭제하시겠습니까?
      </DelAlert>

      {selectedStory && <EditDonationStoryModal storyData={selectedStory} />}
    </ShowcaseSectionLayout>
  );
}

const ShowcaseSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 52px;
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

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
