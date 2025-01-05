import styled from "@emotion/styled";
import Logo from "../../../assets/images/logo.svg?react";
import { Button } from "../buttons/Button";

export default function TopNavHeader() {
  return (
    <TopNavHeaderLayout>
      <Logo />
      <AuthButtonsContainer>
        <TextBtn>회원가입</TextBtn>
        <Button variant="primary" size="medium" state="default">
          로그인
        </Button>
      </AuthButtonsContainer>
    </TopNavHeaderLayout>
  );
}

const TopNavHeaderLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 16px 36px;
  box-sizing: border-box;
`;

const AuthButtonsContainer = styled.div`
  display: flex;
`;

const TextBtn = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.neutrals_02};
  padding: 8px 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  border: none;
`;
