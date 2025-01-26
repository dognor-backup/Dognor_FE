import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg?react";
import { Button } from "../buttons/Button";
import MenuIcon from "../../../assets/icons/black/hamburger_menu.svg?react";
import useUserStore from "@/domains/auth/store/useUserStore";
import { clearUserFromDB } from "@/domains/auth/utils/indexedDB";

export default function TopNavHeader({ activeMenuLink, setIsMenuOpen }) {
  const { user, resetUser } = useUserStore();
  
  const isLogin = !!user.userData?.userId;
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    resetUser();
    localStorage.removeItem("accessToken");
    await clearUserFromDB()
    navigate("/home");
  };
  return (
    <TopNavHeaderLayout>
      <Link to="/home">
        <Logo />
      </Link>

      {isLogin ? (
        <AuthButtonsContainer>
          {activeMenuLink === "map" ? (
            <ToggleBtn onClick={handleToggleMenu}>
              <MenuIcon />
            </ToggleBtn>
          ) : (
            <TextBtn onClick={handleLogout}>로그아웃</TextBtn>
          )}
          <Button variant="normal" size="medium" state="outline">
            마이페이지
          </Button>
        </AuthButtonsContainer>
      ) : (
        <AuthButtonsContainer>
          {activeMenuLink === "map" ? (
            <ToggleBtn onClick={handleToggleMenu}>
              <MenuIcon />
            </ToggleBtn>
          ) : (
            <TextBtn>회원가입</TextBtn>
          )}

          <Button
            variant="primary"
            size="medium"
            state="default"
            onClick={handleLogin}
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
  background: ${({ theme }) => theme.colors.neutrals_08};
  position: relative;
  z-index: 1;
`;

const AuthButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
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
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border: none;
`;
