import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/shared/components/buttons/Button";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import DeleteIcon from "../../../assets/icons/primary/Trash.svg?react";
import useUserStore from "../../auth/store/useUserStore";
import { PostTable } from "@/shared/components/Table/PostTable";
import { DnPagination } from "@/shared/components/DnPagination";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import { useSearchMyPost } from "../../dashboard/hooks/useSearchMyPost";
import { Spinner } from "@/shared/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { deleteMyPosts } from "../../dashboard/api/myPostApi";
import useAlertStore from "@/shared/hooks/useAlertStore";
import DelAlert from "@/shared/components/alert/DelAlert";

const subMenuList = [
 { path: "all", label: "전체", categoryCd: 0 },
 { path: "notice", label: "공지 사항", categoryCd: 1 },
 { path: "free", label: "자유게시판", categoryCd: 2 },
 { path: "dognor", label: "병원 헌혈 후기", categoryCd: 3 },
 { path: "question", label: "질문있어요", categoryCd: 4 },
 { path: "thanks", label: "고마워요", categoryCd: 5 },
 { path: "needbloods", label: "혈액이 필요해요", categoryCd: 6, color: "red" },
];

const TYPE_MAP = {
 커뮤니티: "community",
 헌혈자랑: "donation",
};

export default function MyPosts() {
 const { user } = useUserStore();
 const userSeq = user?.userData?.userSeq;
 const [searchParams, setSearchParams] = useSearchParams();
 const [selectedPosts, setSelectedPosts] = useState([]);
 const [myPosts, setMyPosts] = useState([]);
 const [totalPage, setTotalPage] = useState(1);
 const { openAlert, isAlertOpen } = useAlertStore();

 const currentCategoryPath = searchParams.get("myPosts") || "all";
 const currentCategory =
   subMenuList.find((item) => item.path === currentCategoryPath)?.categoryCd ||
   0;

 const page = parseInt(searchParams.get("page")) || 1;
 const sortByLatest = searchParams.get("sortByLatest") === "true";
 const sortByHitCnt = searchParams.get("sortByHitCnt") === "true";
 const postType = currentCategory === 0 ? "all" : "community";

 const { mutate, isLoading, error } = useSearchMyPost();

 const fetchPosts = () => {
   mutate(
     {
       page,
       size: 15,
       sortByHitCnt,
       sortByLatest,
       myPostsOnly: true,
       categoryCd: currentCategory,
       postType,
     },
     {
       onSuccess: (response) => {
         if (response && response.data) {
           setMyPosts(response.data);
           setSelectedPosts([]);
           setTotalPage(response.totalPage);
         }
       },
       onError: (error) => {
         console.error("게시글 검색 실패:", error);
       },
     }
   );
 };

 const deleteMutation = useMutation({
   mutationFn: deleteMyPosts,
   onSuccess: (response) => {
     console.log("DELETE API 응답:", response);
     fetchPosts(); // 삭제 성공 후 게시글 목록 새로고침
   },
   onError: (error) => {
     console.error("게시글 삭제 실패:", error);
   },
 });

 useEffect(() => {
   if (userSeq) {
     fetchPosts();
   }
 }, [userSeq, page, currentCategory, sortByLatest, sortByHitCnt]);

 const handleCategoryChange = (newCategoryPath) => {
   setSearchParams((prevParams) => {
     prevParams.set("myPosts", newCategoryPath);
     prevParams.set("sortByLatest", "false");
     prevParams.set("sortByHitCnt", "false");
     prevParams.set("page", "1");
     return prevParams;
   });
 };

 const handleCheckboxChange = (seq, division) => {
   const type = TYPE_MAP[division] || "community";
   setSelectedPosts((prev) => {
     const isSelected = prev.some((post) => post.seq === seq);
     if (isSelected) {
       return prev.filter((post) => post.seq !== seq);
     } else {
       return [...prev, { seq, type }];
     }
   });
 };

 const handleCheckAllBox = () => {
   if (selectedPosts.length === myPosts.length) {
     setSelectedPosts([]);
   } else {
     setSelectedPosts(
       myPosts.map((item) => ({
         seq: item.seq,
         type: TYPE_MAP[item.division] || "community",
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

 const handleSendCheckedPost = () => {
   if (selectedPosts.length === 0) {
     alert("삭제할 게시글을 선택하세요.");
     return;
   }
   console.log("삭제 요청할 데이터 구조:", JSON.stringify(selectedPosts, null, 2));
   openAlert('delete', selectedPosts);
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
   <MyPostsLayout>
     <MyPostsHeaderContainer>
       <MyPostsTitleText>나의 게시글</MyPostsTitleText>
       <SubMenuBar
         subMenuList={subMenuList}
         useQueryParams={true}
         activeCategory={currentCategoryPath}
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
         <CheckboxSmall
           name="checkAll"
           label={"전체 선택"}
           checked={selectedPosts.length > 0 && selectedPosts.length === myPosts.length}
           indeterminate={selectedPosts.length > 0 && selectedPosts.length < myPosts.length}
           onChange={handleCheckAllBox}
         />
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
           console.log("DELETE API 요청 데이터:", JSON.stringify(selectedPosts, null, 2));
           try {
             deleteMutation.mutate(selectedPosts);
           } catch (error) {
             console.error("삭제 중 오류 발생:", error);
           }
         }}
       >
         선택한 게시글을 삭제하시겠습니까?
       </DelAlert>
     )}
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
 gap: 8px;
 margin-top: 48px;
`;

const DeleteActionContainer = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 8px;
`;