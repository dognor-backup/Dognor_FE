import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/shared/components/buttons/Button";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import DeleteIcon from "../../assets/icons/primary/Trash.svg?react";
import { useSearchCommunityPosts } from "./hooks/useSearchCommunityPosts";
import useUserStore from "../auth/store/useUserStore";
import { PostTable } from "@/shared/components/Table/PostTable";
import { DnPagination } from "@/shared/components/DnPagination";

const subMenuList = [
  { path: "all", label: "전체", categoryCd: 0 },
  { path: "notice", label: "공지 사항", categoryCd: 1 },
  { path: "free", label: "자유게시판", categoryCd: 2 },
  { path: "dognor", label: "병원 헌혈 후기", categoryCd: 3 },
  { path: "question", label: "질문있어요", categoryCd: 4 },
  { path: "thanks", label: "고마워요", categoryCd: 5 },
  { path: "needbloods", label: "혈액이 필요해요", categoryCd: 6, color: "red" },
];

export default function MyPosts() {
  const { user } = useUserStore();
  const userSeq = user?.userData?.userSeq;
  const [searchParams, setSearchParams] = useSearchParams();

  const [communityPosts, setCommunityPosts] = useState([]);

  const page = parseInt(searchParams.get("page")) || 1;
  const categoryCd = parseInt(searchParams.get("category")) || 0;
  const sortByLatest = searchParams.get("sortByLatest") === "true";
  const sortByHitCnt = searchParams.get("sortByHitCnt") === "true";

  const { mutate, isLoading, error } = useSearchCommunityPosts();

  useEffect(() => {
    if (userSeq) {
      mutate(
        {
          page,
          size: 15,
          sortByHitCnt,
          sortByLatest,
          myPostsOnly: true,
          categoryCd: categoryCd === 0 ? null : categoryCd,
        },
        {
          onSuccess: ({ success, data }) => {
            if (success) {
              console.log(data);
              setCommunityPosts(data);
            } else {
              console.log("검색 실패");
            }
          },
        }
      );
    }
  }, [userSeq, page, categoryCd, sortByLatest, sortByHitCnt, mutate]);

  const handlePageChange = (newPage) => {
    setSearchParams((prevParams) => {
      prevParams.set("page", newPage);
      return prevParams;
    });
  };

  const handleCategoryChange = (newCategoryCd) => {
    setSearchParams((prevParams) => {
      prevParams.set("category", newCategoryCd);
      prevParams.set("page", "1");
      return prevParams;
    });
  };

  const handleSortChange = (sortType) => {
    setSearchParams((prevParams) => {
      if (sortType === "latest") {
        prevParams.set("sortByLatest", "true");
        prevParams.set("sortByHitCnt", "false");
      } else if (sortType === "hitCnt") {
        prevParams.set("sortByLatest", "false");
        prevParams.set("sortByHitCnt", "true");
      }
      prevParams.set("page", "1");
      return prevParams;
    });
  };

  const totalPages =
    communityPosts && Array.isArray(communityPosts)
      ? Math.ceil(communityPosts.length / 15) || 1
      : 1;

  if (!userSeq) return <div>로그인이 필요합니다.</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <MyPostsLayout>
      <MyPostsHeaderContainer>
        <MyPostsTitleText>나의 게시글</MyPostsTitleText>
        <SubMenuBar
          subMenuList={subMenuList}
          useQueryParams={true}
          activeCategory={categoryCd}
          onCategoryChange={handleCategoryChange}
        />
      </MyPostsHeaderContainer>
      <TableContainer>
        <FilterBtnContainer>
          <Button
            variant="normal"
            size="small"
            state="outline"
            onClick={() => handleSortChange("latest")}
          >
            최신순
          </Button>
          <Button
            variant="normal"
            size="small"
            state="outline"
            onClick={() => handleSortChange("hitCnt")}
          >
            조회순
          </Button>
        </FilterBtnContainer>
        <DeleteActionContainer>
          <CheckboxContainer>
            <Checkbox name={"selectAll"} label={"전체 선택"} size={"small"} />
          </CheckboxContainer>
          <IconBtn variant="primary" size="medium" state="outline">
            <DeleteIcon />
          </IconBtn>
        </DeleteActionContainer>
        <PostTable data={communityPosts} />
      </TableContainer>
      <DnPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </MyPostsLayout>
  );
}

const MyPostsLayout = styled.div`
  max-width: 1008px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const MyPostsTitleText = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const MyPostsHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterBtnContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: 4px;
`;

const DeleteActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckboxContainer = styled.div`
  padding: 12px 16px;
`;
