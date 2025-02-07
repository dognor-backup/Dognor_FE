import { Button } from "@/shared/components/buttons/Button";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Dots from "/src/assets/icons/gray/dots_vertical_g.svg?react";
import useUserStore from "@/domains/auth/store/useUserStore";
const maxLength = 400;

export function CommentsList({ comments = { data: [] } }) {
  const [checkTextLength, setTextLength] = useState(0);
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useUserStore();
  const { userId } = user.userData || "undefined";
  const [currentEdit, setCurrentEdit] = useState(null);

  const handleChange = (e) => {
    setTextLength(text.length);
    setText(e.target.value);
    // getValueFromCommentArea(text);
  };

  /* {
  "commentSeq": 1,
  "comment": "content"
} */

  // 현재 로그인한 사용자와 댓글 유저가 일치하면 해당 댓글에 ... 을 보여준다
  // 점 버튼을 누르면 현재 클릭한 댓글창만 수정모드가 된다.

  //   onClick={() => handleEditClick(commentSeq, comment)}

  const handleEditClick = ({ commentSeq, comment }) => {
    setCurrentEdit(commentSeq);
    setText(comment);
    setIsEditing(true);
  };

  const handleUpdateComment = () => {
    setIsEditing(false);
    setCurrentEdit(null);
  };
  return (
    <>
      {comments.data?.map((item) => {
        const { comment, commentSeq, firstSaveDt, firstSaveUser } = item;
        const currentEditingComment = currentEdit === commentSeq && userId === firstSaveUser && isEditing;
        return (
          <CommentWrapper>
            <InputContainer>
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
                  onClick={() => handleUpdateComment()}
                >
                  수정
                </Button>
                <Button variant="normal" size="medium" state="default" style={{ height: "50%" }}>
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

const CommentWrapper = styled.article`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;
const UserName = styled.span(
  ({ theme }) => `
    font-size: 14px;
    font-weight: 700;
    color: ${theme.colors.neutrals_02};
    position: absolute;
    top: 8px;
    left: 8px
`
);
const InputContainer = styled.div(
  ({ theme }) => `
border: 1px solid ${theme.colors.neutrals_05};
position: relative;
width: calc(100% - 50px);
height: 96px;
border-radius: 6px
`
);
const CommentInput = styled.textarea`
  all: unset;
  position: absolute;
  top: 26px;
  left: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 28px);
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
  position: absolute;
  top: 26px;
  left: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 28px);
  padding: 0;
  margin: 0;
  font-size: 14px;
  line-height: 21px;
`;
