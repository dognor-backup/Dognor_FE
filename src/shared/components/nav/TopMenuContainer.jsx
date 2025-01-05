import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function TopMenuContainer() {
  return (
    <TopMenuLayout>
      <TopMenuLink to="donationinfo">헌혈 안내</TopMenuLink>
      <TopMenuLink to="map">병원소식</TopMenuLink>
      <TopMenuLink to="showcase">헌혈견 자랑</TopMenuLink>
      <TopMenuLink to="community">커뮤니티</TopMenuLink>
      <TopMenuLink to="campaigns">캠페인</TopMenuLink>
      <TopMenuLink to="aboutus">About Us</TopMenuLink>
    </TopMenuLayout>
  );
}

const TopMenuLayout = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-content: center;
  padding: 8px 36px;
  gap: 24px;
`;

const TopMenuLink = styled(Link)`
display: flex;
justify-content: center;
align-items: center
  min-width: 95px;
  padding: 8px;
  gap: 8px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue_dark_400};
  background-color: transparent;
  }
`;
