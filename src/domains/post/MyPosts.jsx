import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/buttons/Button";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import DeleteIcon from "../../assets/icons/primary/Trash.svg?react";
import useUserStore from "../auth/store/useUserStore";
import { PostTable } from "@/shared/components/Table/PostTable";
import { DnPagination } from "@/shared/components/DnPagination";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import { useSearchMyPost } from "../dashboard/hooks/useSearchMyPost";
import { Spinner } from "@/shared/components/Spinner";

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
  const navigate = useNavigate();
  const [selectedPosts, setSelectedPosts] = useState([]); // ✅ 전체 선택 상태 관리
  const [myPosts, setMyPosts] = useState([]);

  const page = parseInt(searchParams.get("page")) || 1;
  const categoryCd = parseInt(searchParams.get("category")) || 0;
  const sortByLatest = searchParams.get("sortByLatest") === "true";
  const sortByHitCnt = searchParams.get("sortByHitCnt") === "true";
  const [totalPage, setTotalPage] = useState(1);

  const { mutate, isLoading, error } = useSearchMyPost();

  useEffect(() => {
    if (userSeq) {
      mutate(
        {
          page,
          size: 10,
          sortByHitCnt,
          sortByLatest,
          myPostsOnly: true,
          categoryCd: categoryCd || 0,
        },
        {
          onSuccess: (response) => {
            if (response && response.data) {
              setMyPosts(response.data);
              setSelectedPosts([]);
              setTotalPage(response.totalPage);
            } else {
              console.error("게시글 검색 실패: 데이터 없음");
            }
          },
          onError: (error) => {
            console.error("게시글 검색 실패:", error);
          },
        }
      );
    }
  }, [userSeq, page, categoryCd, sortByLatest, sortByHitCnt, mutate]);

  const handleCheckAllBox = () => {
    if (selectedPosts.length === myPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(myPosts.map((item) => item.writeDt));
    }
  };

  const handleSendCheckedPost = () => {
    console.log("삭제할 게시글:", selectedPosts);
  };

  const getClickedPageNumber = (clicked) => {
    const currentPage = getCategoryList.searchParam.page;

    let newPage;
    if (clicked === "next" && currentPage < totalPage) {
      newPage = currentPage + 1;
    } else if (clicked === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else {
      newPage = Number(clicked);
    }
    if (newPage) {
      setCategoryList((prev) => ({
        ...prev,
        searchParam: { ...prev.searchParam, page: newPage },
      }));
    }
  };

  if (!userSeq) return <div>로그인이 필요합니다.</div>;
  if (isLoading) return <Spinner />;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <MyPostsLayout>
      <MyPostsHeaderContainer>
        <MyPostsTitleText>나의 게시글</MyPostsTitleText>
        <SubMenuBar
          subMenuList={subMenuList}
          activeCategory={categoryCd}
          onCategoryChange={(newCategoryCd) => {
            setSearchParams((prevParams) => {
              prevParams.set("category", newCategoryCd);
              prevParams.set("page", "1");
              return prevParams;
            });
          }}
        />
      </MyPostsHeaderContainer>
      <TableContainer>
        <FilterBtnContainer>
          <Button
            variant="normal"
            size="small"
            state="outline"
            onClick={() => {
              setSearchParams((prevParams) => {
                prevParams.set("sortByLatest", "true");
                prevParams.set("sortByHitCnt", "false");
                prevParams.set("page", "1");
                return prevParams;
              });
            }}
          >
            최신순
          </Button>
          <Button
            variant="normal"
            size="small"
            state="outline"
            onClick={() => {
              setSearchParams((prevParams) => {
                prevParams.set("sortByLatest", "false");
                prevParams.set("sortByHitCnt", "true");
                prevParams.set("page", "1");
                return prevParams;
              });
            }}
          >
            조회순
          </Button>
        </FilterBtnContainer>
        <DeleteActionContainer>
          <CheckboxContainer>
            <CheckboxSmall
              name="checkAll"
              checked={
                selectedPosts.length === myPosts.length && myPosts.length > 0
              }
              onChange={handleCheckAllBox}
            />
          </CheckboxContainer>
          <IconBtn
            variant="primary"
            size="medium"
            state="outline"
            onClick={handleSendCheckedPost}
          >
            <DeleteIcon />
          </IconBtn>
        </DeleteActionContainer>
        <PostTable
          data={myPosts}
          selectedPosts={selectedPosts}
          setSelectedPosts={setSelectedPosts}
        />
      </TableContainer>
      <DnPagination
        totalPages={totalPage}
        getClickedPageNumber={getClickedPageNumber}
      />
    </MyPostsLayout>
  );
}

const MyPostsLayout = styled.div`
  max-width: 1008px;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  margin-top: 48px;
`;

const DeleteActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckboxContainer = styled.div`
  padding: 12px 16px;
`;
