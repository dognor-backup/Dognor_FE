import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import useUserStore from "../../auth/store/useUserStore";
import { DnPagination } from "@/shared/components/DnPagination";
import { Spinner } from "@/shared/components/Spinner";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import { useSearchMyCommentReview } from "../../dashboard/hooks/useSearchMyCommentReview";
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
 const [myComments, setMyComments] = useState([]);
 const [totalPage, setTotalPage] = useState(1);

 const currentCategoryPath = searchParams.get("myComments") || "all";
 const currentCategory =
   subMenuList.find((item) => item.path === currentCategoryPath)?.categoryCd ||
   "all";

 const page = parseInt(searchParams.get("page")) || 1;
 
 const { mutate, isLoading, error } = useSearchMyCommentReview();

 useEffect(() => {
   if (userSeq) {
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
   }
 }, [userSeq, page, currentCategory, mutate]);

 const handleCategoryChange = (newCategoryPath) => {
   setSearchParams((prevParams) => {
     prevParams.set("myComments", newCategoryPath);
     prevParams.set("page", "1");
     return prevParams;
   });
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
       <CommentTable data={myComments} />
     </TableContainer>
     <DnPagination 
       totalPage={totalPage} 
       getClickedPageNumber={handlePageChange}
     />
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
 margin-top: 48px;
`;