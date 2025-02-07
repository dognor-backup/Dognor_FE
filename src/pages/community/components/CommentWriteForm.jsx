import useUserStore from "@/domains/auth/store/useUserStore";
import { Button } from "@/shared/components/buttons/Button";
import styled from "@emotion/styled";
import { useState } from "react";
const maxLength = 400;

export function CommentWriteForm() {
  const { user } = useUserStore();
  const { userId } = user.userData || "undefined";
  const [checkTextLength, setTextLength] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출");
  };
  const handleChange = (e) => {
    setTextLength(e.target.value);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <CommentWrapper>
        <InputContainer>
          <UserName>{userId}</UserName>
          <CkLength>
            {checkTextLength.length}/{maxLength}
          </CkLength>
          <CommentInput placeholder="댓글을 작성해주세요" onChange={handleChange} maxLength={maxLength} />
        </InputContainer>
        <Flex>
          <Button variant="normal" size="medium" state="default" style={{ height: "100%" }}>
            등록
          </Button>
        </Flex>
      </CommentWrapper>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;
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
