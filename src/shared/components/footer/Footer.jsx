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
          <Links>
            <Link to="/">
              <TextBtn>이용약관</TextBtn>
            </Link>
            <Link to="/">
              <TextBtn>개인정보처리방법</TextBtn>
            </Link>
            <Link to="/">
              <TextBtn>공지사항</TextBtn>
            </Link>
          </Links>
          <LinkIcon>
            <Instagram />
          </LinkIcon>
        </LinkWrapper>

        <Text>Project Team: dognor | Email: dognor@naver.com</Text>
        <Text>
          <span>&copy;</span> dognor
        </Text>
      </FooterContainer>
    </>
  );
};
export default Footer;

const FooterContainer = styled.footer(
  ({ theme }) => `
  background-color: ${theme.colors.neutrals_01};
  width: 100%;
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
  gap: 21px;
  display: flex;
  justify-content: space-between;
`;
const TextBtn = styled.p`
  color: #fcf9f4;
  font-size: 14px;
  padding: 4px;
  display: inline-block;
  cursor: pointer;
`;
const Text = styled.p`
  color: #fcf9f4;
  font-size: 14px;
`;
const LinkIcon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-block;
`;
const Links = styled.div`
  display: flex;
  gap: 24px;
`;
const Logo = styled.strong`
  width: 140px;
  height: 38px;
  display: inline-block;
  cursor: pointer;
`;
