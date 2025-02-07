import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import styled from "@emotion/styled";
import { Button } from "@/shared/components/buttons/Button";
import { CommentWriteForm } from "./components/CommentWriteForm";
import { updateComment } from "@/domains/post/api/post";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function PostDetail() {
  const [userComment, setUserComment] = useState("");
  const location = useLocation();
  const post = location.state?.item;

  const { categoryCd, categoryName, content, firstSaveDt, firstSaveUser, hitCnt, postSeq, title, usageDate } =
    post || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userComment.length > 1) updateCommentMutation.mutate({ postSeq, comment: userComment });
  };

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const getValueFromCommentArea = (data) => setUserComment(data);

  return (
    <div>
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
          </PostHeader>
          <ContentContainer>{parse(content)}</ContentContainer>
          <div></div>
        </PageTop>
        <Form onSubmit={handleSubmit}>
          <CommentWriteForm
            getValueFromCommentArea={getValueFromCommentArea}
            updateCommentMutation={updateCommentMutation}
          />
        </Form>
        <Button style={{ width: "320px" }}>목록으로 돌아가기</Button>
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
  margin-bottom: 48px
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
line-height: 24px
`
);
const Mg = styled.span`
  margin-left: 10px;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.div(
  ({ theme }) => `
  text-align: left;
  padding-bottom: 48px;
  border-bottom: 1px solid ${theme.colors.neutrals_04};
  margin-bottom: 48px;
`
);
const Form = styled.form`
  width: 100%;
`;
