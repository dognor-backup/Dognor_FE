import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import { searchComments } from "@/domains/post/api/post";
import { deleteCommentMutation, updateCommentMutation } from "./hooks/useComment";
import { useGetUserId } from "./hooks/useGetUserId";
import { useDeleteTargetPostMutation } from "@/pages/community/hooks/useDeletePost";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { Button } from "@/shared/components/buttons/Button";
import { CommentWriteForm } from "./components/CommentWriteForm";
import { CommentsList } from "./components/CommentsList";
import { DnPagination } from "./components/DnPagination";
import VerticalDotsSelect from "./components/ToggleBtn";
import useAlertStore from "@/shared/hooks/useAlertStore";
import DelAlert from "@/shared/components/alert/DelAlert";
import styled from "@emotion/styled";

export function PostDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.item;
  const { userId } = useGetUserId() || {};
  const [userComment, setUserComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postComments, setPostComments] = useState();
  const [totalPage, setTotalPage] = useState();
  const deletePostMutation = useDeleteTargetPostMutation("post");
  const deleteComment = deleteCommentMutation();
  const updateComment = updateCommentMutation();
  const { isAlertOpen, openAlert, deleteType, deleteTargetSeq } = useAlertStore();
  const { categoryCd, categoryName, content, firstSaveDt, firstSaveUser, hitCnt, postSeq, title, usageDate } =
    post || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userComment.length > 1) updateComment.mutate({ postSeq, comment: userComment });
  };

  const { data: commentList } = useQuery({
    queryKey: ["comment"],
    queryFn: () => searchComments({ postSeq, page: currentPage, size: 8 }),
  });

  useEffect(() => {
    if (commentList?.success) {
      const { data, totalPage: allPage } = commentList?.data;
      setTotalPage(allPage);
      setPostComments(data);
    }
  }, [commentList]);

  const getValueFromCommentArea = (data) => setUserComment(data);

  const getClickedPageNumber = (clicked) => {
    let newPage;
    if (clicked === "next" && currentPage < totalPage) {
      newPage = currentPage + 1;
    } else if (clicked === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else {
      newPage = Number(clicked);
    }
    if (newPage) {
      setCurrentPage(newPage);
    }
  };

  const handleEditPosting = () => navigate(`/postedit/${postSeq}`, { state: post });

  const handleConfirmDelete = () => {
    if (deleteType === "post") {
      deletePostMutation.mutate(postSeq);
      return navigate("/community/all");
    }
    if (deleteType === "comment") {
      return deleteComment.mutate(deleteTargetSeq);
    }
  };

  return (
    <div>
      {isAlertOpen && (
        <>
          <DelAlert isAlertOpen={isAlertOpen} func={handleConfirmDelete}>
            삭제하시겠습니까
          </DelAlert>
        </>
      )}
      <PageWrapper>
        <PageTop>
          <PostHeader>
            <PostTitle>{title}</PostTitle>
            <PostInfo>
              <Flex>
                <p>
                  커뮤니티<Mg>{categoryName}</Mg>
                </p>
                <p>
                  <Mg>{hitCnt} </Mg>조회
                </p>
              </Flex>
              <p>
                업데이트<Mg>{firstSaveDt}</Mg>
              </p>
              <p>
                작성자<Mg>{firstSaveUser}</Mg>
              </p>
            </PostInfo>
            {userId === firstSaveUser && (
              <DotsContainer>
                <VerticalDotsSelect
                  handleEdit={() => handleEditPosting(postSeq)}
                  handleDelete={() => openAlert("post")}
                />
              </DotsContainer>
            )}
          </PostHeader>
          <ContentContainer>{parse(content)}</ContentContainer>
        </PageTop>

        <Form onSubmit={handleSubmit}>
          {
            <CountComments>
              <Mg20>댓글수</Mg20>
              {postComments?.length}
            </CountComments>
          }
          {userId && (
            <CommentWriteForm getValueFromCommentArea={getValueFromCommentArea} updateComment={updateComment} />
          )}
          <CommentsList comments={postComments} openAlert={openAlert} deleteTargetSeq={deleteTargetSeq} />
        </Form>
        {postComments?.length < 1 ? (
          <></>
        ) : (
          <DnPagination totalPage={totalPage} getClickedPageNumber={getClickedPageNumber} />
        )}
        <BtnContainer>
          <Button style={{ width: "320px" }} onClick={() => navigate(-1)}>
            페이지 돌아가기
          </Button>
        </BtnContainer>
      </PageWrapper>
    </div>
  );
}

const PostHeader = styled.div(
  ({ theme }) => `
  text-align: left;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.neutrals_04};
  padding-bottom: 8px;
  position: relative;
`
);
const PostTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 8px;
`;

const PostInfo = styled.p(
  ({ theme }) => `
  color: ${theme.colors.neutrals_02};
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  `
);
const Mg = styled.span`
  margin-left: 10px;
`;
const Mg20 = styled.span`
  margin-right: 20px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.div(
  ({ theme }) => `
  text-align: left;
  padding-bottom: 48px;
  padding-top: 48px;
  border-bottom: 1px solid ${theme.colors.neutrals_04};
  margin-bottom: 48px;
`
);
const Form = styled.form`
  width: 100%;
`;
const BtnContainer = styled.div`
  margin-top: 80px;
  margin-bottom: 100px;
`;
const CountComments = styled.span(
  ({ theme }) => `
  font-size: 14px;
  color: ${theme.colors.neutrals_02};
  `
);
const DotsContainer = styled.div`
  margin-top: 16px;
  position: absolute;
  right: 0;
  top: -36px;
`;
