import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "../../../assets/images/logo.svg?react";

export default function LogoNav() {
  return (
    <LogoNavLayout>
      <Link to="/">
        <Logo />
      </Link>
    </LogoNavLayout>
  );
}

const LogoNavLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 1080px;
  position: fixed;
  top: 0;
  padding: 16px 36px;
  background: ${({ theme }) => theme.colors.neutrals_08};
`;
