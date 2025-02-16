import { Button } from "@/shared/components/buttons/Button";
import styled from "@emotion/styled";
import { useState } from "react";
import Dots from "/src/assets/icons/gray/dots_vertical_g.svg?react";
import useUserStore from "@/domains/auth/store/useUserStore";
import { editComment } from "@/domains/post/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const maxLength = 400;

export function CommentsList({ comments = { data: [] }, openAlert, deleteTargetSeq }) {
  const [checkTextLength, setTextLength] = useState(0);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { userId } = user.userData || "undefined";
  const [currentEdit, setCurrentEdit] = useState(null);
  const queryClient = useQueryClient();
  const handleChange = (e) => {
    setTextLength(text.length);
    setText(e.target.value);
  };

  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: ({ success }) => {
      if (success) {
        queryClient.invalidateQueries(["comment"]);
      }
    },
  });

  const handleEditClick = ({ commentSeq, comment }) => {
    setCurrentEdit(commentSeq);
    setText(comment);
    setIsEditing(true);
  };

  const handleUpdateComment = (commentSeq) => {
    setIsEditing(false);
    setCurrentEdit(null);
    editCommentMutation.mutate({ commentSeq, comment: text });
  };

  return (
    <>
      {comments.data?.map((item) => {
        const { comment, commentSeq, firstSaveDt, firstSaveUser } = item;
        const currentEditingComment = currentEdit === commentSeq && userId === firstSaveUser && isEditing;
        return (
          <CommentWrapper key={commentSeq} isEditing={currentEditingComment ? true : false}>
            <InputContainer isEditing={currentEditingComment ? true : false}>
              <UserName>{firstSaveUser}</UserName>
              {currentEditingComment ? (
                <>
                  <CkLength>
                    {checkTextLength}/{maxLength}
                  </CkLength>
                  <CommentInput
                    onChange={(e) => {
                      setText(e.target.value);
                      handleChange(e);
                    }}
                    maxLength={maxLength}
                    value={text}
                  />
                </>
              ) : (
                <CommentValue>{comment}</CommentValue>
              )}
            </InputContainer>
            {/* 로그인한 유저와 댓글을 작성한 유저가 같으면 ... 버튼이 뜬다. */}
            {/* 현재 수정중인 코멘트와 코멘트가 일치하지 않을 때  */}
            {userId === firstSaveUser && currentEdit !== commentSeq && (
              <DotsContainer onClick={() => handleEditClick({ commentSeq, comment })}>
                <Dots style={{ cursor: "pointer" }} />
              </DotsContainer>
            )}

            {currentEditingComment && (
              <Flex>
                <Button
                  variant="normal"
                  size="medium"
                  state="outline"
                  style={{ height: "50%" }}
                  onClick={(e) => handleUpdateComment(commentSeq)}
                >
                  수정
                </Button>
                <Button
                  variant="normal"
                  size="medium"
                  state="default"
                  style={{ height: "50%" }}
                  onClick={() => openAlert("comment", commentSeq)}
                >
                  삭제
                </Button>
              </Flex>
            )}
          </CommentWrapper>
        );
      })}
    </>
  );
}

const CommentWrapper = styled.article(
  ({ theme, isEditing }) => `
  display: flex;
  gap: 8px;
  padding: ${isEditing ? "16px 0" : "0"};
  border-bottom: 1px solid ${theme.colors.neutrals_05};
`
);
const UserName = styled.span(
  ({ theme }) => `
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.neutrals_02};
    line-height: 20px
`
);
const InputContainer = styled.div(
  ({ theme, isEditing }) => `
    border: 1px solid ${isEditing ? theme.colors.purple_normal_200 : "transparent"};
    position: relative;
    width: calc(100% - 50px);
    height:${isEditing ? "96px" : "fit-content"};
    border-radius: ${isEditing ? "6px" : "0px"};

    padding: 6px 8px;
`
);
const CommentInput = styled.textarea`
  all: unset;
  width: 100%;
  height: calc(100% - 18px);
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 21px;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const DotsContainer = styled.div`
  margin-top: 16px;
`;
const CkLength = styled.span(
  ({ theme }) => `
font-size: 14px;
color: ${theme.colors.neutrals_02};
position: absolute;
right: 14px;
top: 4px;
text-align: right
`
);
const CommentValue = styled.div`
  width: calc(100% - 16px);
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 21px;
`;
