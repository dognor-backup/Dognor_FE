import { Button } from "@/shared/components/buttons/Button";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";
const maxLength = 400;

export function CommentWriteForm({ getValueFromCommentArea, updateComment }) {
  const { userId } = useGetUserId();
  const [checkTextLength, setTextLength] = useState(0);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setTextLength(text.length);
    setText(e.target.value);
    getValueFromCommentArea(text);
  };

  useEffect(() => {
    if (updateComment.isSuccess) {
      setText("");
      setTextLength(0);
    }
  }, [updateComment.isSuccess]);

  return (
    <CommentWrapper>
      <InputContainer>
        <UserName>{userId}</UserName>
        <CkLength>
          {checkTextLength}/{maxLength}
        </CkLength>
        <CommentInput placeholder="댓글을 작성해주세요" onChange={handleChange} maxLength={maxLength} value={text} />
      </InputContainer>
      <Flex>
        <Button variant="normal" size="medium" state="default" style={{ height: "100%" }}>
          등록
        </Button>
      </Flex>
    </CommentWrapper>
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
  top: 28px;
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
