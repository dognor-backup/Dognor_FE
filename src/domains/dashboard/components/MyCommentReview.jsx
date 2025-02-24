import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/shared/components/buttons/Button";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import DeleteIcon from "../../../assets/icons/primary/Trash.svg?react";
import useUserStore from "../../auth/store/useUserStore";
import { DnPagination } from "@/shared/components/DnPagination";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import { useSearchMyCommentReview } from "../../dashboard/hooks/useSearchMyCommentReview";
import { Spinner } from "@/shared/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import useAlertStore from "@/shared/hooks/useAlertStore";
import DelAlert from "@/shared/components/alert/DelAlert";
import { CommentTable } from "@/shared/components/Table/CommentTable";

const subMenuList = [
{ path: "all", label: "전체", categoryCd: "all" },
{ path: "review", label: "병원소식 리뷰", categoryCd: "review" },
{ path: "comment", label: "커뮤니티 댓글", categoryCd: "comment" },
];

export default function MyCommentReview() {
const { user } = useUserStore();
const userSeq = user?.userData?.userSeq;
const [searchParams, setSearchParams] = useSearchParams();
const [selectedComments, setSelectedComments] = useState([]);
const [myComments, setMyComments] = useState([]);
const [totalPage, setTotalPage] = useState(1);
const { openAlert, isAlertOpen } = useAlertStore();

const currentCategoryPath = searchParams.get("myComments") || "all";
const currentCategory =
  subMenuList.find((item) => item.path === currentCategoryPath)?.categoryCd ||
  "all";

const page = parseInt(searchParams.get("page")) || 1;
const sortByLatest = searchParams.get("sortByLatest") === "true";
const sortByHitCnt = searchParams.get("sortByHitCnt") === "true";

const { mutate, isLoading, error } = useSearchMyCommentReview();

const fetchComments = () => {
  mutate(
    {
      page,
      size: 15,
      commentReviewType: currentCategory,
    },
    {
      onSuccess: (response) => {
        if (response && response.data) {
          setMyComments(response.data);
          setSelectedComments([]);
          setTotalPage(response.totalPage);
        } else {
          console.error("댓글/리뷰 검색 실패: 데이터 없음");
        }
      },
      onError: (error) => {
        console.error("댓글/리뷰 검색 실패:", error);
      },
    }
  );
};

useEffect(() => {
  if (userSeq) {
    fetchComments();
  }
}, [userSeq, page, currentCategory, sortByLatest, sortByHitCnt]);

const handleCategoryChange = (newCategoryPath) => {
  setSearchParams((prevParams) => {
    prevParams.set("myComments", newCategoryPath);
    prevParams.set("sortByLatest", "false");
    prevParams.set("sortByHitCnt", "false");
    prevParams.set("page", "1");
    return prevParams;
  });
};

const handleCheckboxChange = (seq) => {
  setSelectedComments((prev) => {
    const isSelected = prev.some((comment) => comment.seq === seq);
    if (isSelected) {
      return prev.filter((comment) => comment.seq !== seq);
    } else {
      return [...prev, { seq }];
    }
  });
};

const handleCheckAllBox = () => {
  if (selectedComments.length === myComments.length) {
    setSelectedComments([]);
  } else {
    setSelectedComments(
      myComments.map((item) => ({
        seq: item.seq,
      }))
    );
  }
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

const handleSendCheckedComment = () => {
  if (selectedComments.length === 0) {
    alert("삭제할 댓글/리뷰를 선택하세요.");
    return;
  }
  openAlert('delete', selectedComments);
};

const handlePageChange = (clickedPage) => {
  setSearchParams((prevParams) => {
    if (clickedPage === "prev") {
      const prevPage = Math.max(1, page - 1);
      prevParams.set("page", prevPage.toString());
    } else if (clickedPage === "next") {
      const nextPage = Math.min(totalPage, page + 1);
      prevParams.set("page", nextPage.toString());
    } else {
      prevParams.set("page", clickedPage.toString());
    }
    return prevParams;
  });
};

if (!userSeq) return <div>로그인이 필요합니다.</div>;
if (isLoading) return <Spinner />;
if (error) return <div>에러 발생: {error.message}</div>;

return (
  <MyCommentReviewLayout>
    <MyCommentReviewHeaderContainer>
      <MyCommentReviewTitleText>나의 댓글/리뷰</MyCommentReviewTitleText>
      <SubMenuBar
        subMenuList={subMenuList}
        useQueryParams={true}
        activeCategory={currentCategoryPath}
        onCategoryChange={handleCategoryChange}
      />
    </MyCommentReviewHeaderContainer>

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
        <CheckboxSmall
          name="checkAllCommentReview"
          label={"전체 선택"}
          checked={selectedComments.length > 0 && selectedComments.length === myComments.length}
          indeterminate={selectedComments.length > 0 && selectedComments.length < myComments.length}
          onChange={handleCheckAllBox}
        />
        <IconBtn
          variant="primary"
          size="medium"
          state="outline"
          onClick={handleSendCheckedComment}
        >
          <DeleteIcon />
        </IconBtn>
      </DeleteActionContainer>
      <CommentTable
        data={myComments}
        selectedComments={selectedComments}
        handleCheckboxChange={handleCheckboxChange}
      />
    </TableContainer>
    <DnPagination 
      totalPage={totalPage} 
      getClickedPageNumber={handlePageChange}
    />
    
    {isAlertOpen && (
      <DelAlert
        isAlertOpen={isAlertOpen}
        func={() => {
          try {
            fetchComments();
          } catch (error) {
            console.error("삭제 중 오류 발생:", error);
          }
        }}
      >
        선택한 댓글/리뷰를 삭제하시겠습니까?
      </DelAlert>
    )}
  </MyCommentReviewLayout>
);
}

const MyCommentReviewLayout = styled.div`
 max-width: 1008px;
 width: 100%;
 display: flex;
 flex-direction: column;
`;

const MyCommentReviewTitleText = styled.p`
 font-weight: 700;
 font-size: 32px;
 line-height: 42px;
 color: ${({ theme }) => theme.colors.neutrals_00};
`;

const MyCommentReviewHeaderContainer = styled.div`
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
 gap: 8px;
 margin-top: 48px;
`;

const DeleteActionContainer = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 8px;
`;