import styled from "@emotion/styled";
import Logo from "../../../assets/images/logo.svg?react";
import { Button } from "../buttons/Button";
import { useState } from "react";

export default function TopNavHeader({ activeMenuLink }) {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <TopNavHeaderLayout>
      <Logo />
      {isLogin ? (
        <AuthButtonsContainer>
          <TextBtn onClick={() => setIsLogin(false)}>로그아웃</TextBtn>
          <Button variant="normal" size="medium" state="outline">
            마이페이지
          </Button>
        </AuthButtonsContainer>
      ) : (
        <AuthButtonsContainer>
          {activeMenuLink === "map" ? (
            <ToggleBtn>asd</ToggleBtn>
          ) : (
            <TextBtn>회원가입</TextBtn>
          )}
          <Button
            variant="primary"
            size="medium"
            state="default"
            onClick={() => setIsLogin(true)}
          >
            로그인
          </Button>
        </AuthButtonsContainer>
      )}
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

const ToggleBtn = styled.button`
  background-color: transparent;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center
  padding: 8px;
  cursor: pointer;
  border: none;
`;
