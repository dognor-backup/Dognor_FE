import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import LogoFooter from "../../../assets/images/logofooter.svg?react";
import Instagram from "../../../assets/icons/white/instagram_logo_w.svg?react";

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Logo>
          <LogoFooter />
        </Logo>
        <LinkWrapper>
          <Link to="/">
            <Text>이용약관</Text>
          </Link>
          <Link to="/">
            <Text>개인정보처리방법</Text>
          </Link>
          <Link to="/">
            <Text>공지사항</Text>
          </Link>
        </LinkWrapper>
        <Text>Project Team: dognor | Email: dognor@naver.com</Text>
        <Text>
          <span>&copy;</span> dognor
        </Text>
        <LinkIcon>
          <Instagram />
        </LinkIcon>
      </FooterContainer>
    </>
  );
};
export default Footer;

const FooterContainer = styled.footer(
  ({ theme }) => `
  height: 238px;
  background-color: ${theme.colors.neutrals_01};
  width: 100vw;
  position: relative;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  gap: 24px;
  flex-direction: column;
`
);
const LinkWrapper = styled.div`
  font-size: 14px;
  display: flex;
  gap: 24px;
`;
const Text = styled.p`
  color: #fcf9f4;
  font-size: 14px;
`;
const LinkIcon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-block;
  position: absolute;
  right: 45px;
  top: 96px;
`;

const Logo = styled.strong`
  width: 140px;
  height: 38px;
  display: inline-block;
`;
