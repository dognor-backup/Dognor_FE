import styled from "@emotion/styled";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TopNavMenuContainer() {
  const [activeLink, setActiveLink] = useState("");

  return (
    <TopNavMenuLayout>
      <TopNavMenuLink
        isActive={activeLink === "donationinfo"}
        onClick={() => setActiveLink("donationinfo")}
        to="donationinfo"
      >
        헌혈 안내
      </TopNavMenuLink>
      <TopNavMenuLink
        isActive={activeLink === "map"}
        onClick={() => setActiveLink("map")}
        to="map"
      >
        병원소식
      </TopNavMenuLink>
      <TopNavMenuLink
        isActive={activeLink === "showcase"}
        onClick={() => setActiveLink("showcase")}
        to="showcase"
      >
        헌혈견 자랑
      </TopNavMenuLink>
      <TopNavMenuLink
        isActive={activeLink === "community"}
        onClick={() => setActiveLink("community")}
        to="community"
      >
        커뮤니티
      </TopNavMenuLink>
      <TopNavMenuLink
        isActive={activeLink === "campaigns"}
        onClick={() => setActiveLink("campaigns")}
        to="campaigns"
      >
        캠페인
      </TopNavMenuLink>
      <TopNavMenuLink
        isActive={activeLink === "aboutus"}
        onClick={() => setActiveLink("aboutus")}
        to="aboutus"
      >
        About Us
      </TopNavMenuLink>
    </TopNavMenuLayout>
  );
}

const TopNavMenuLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  padding: 8px 36px;
  gap: 24px;
  box-sizing: border-box;
`;

const TopNavMenuLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 95px;
  padding: 8px;
  gap: 8px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.blue_normal_100 : theme.colors.blue_dark_400};
  background-color: transparent;
  text-decoration: none;
  border-bottom: ${({ isActive, theme }) =>
    isActive ? `1px solid ${theme.colors.blue_normal_100}` : "none"};

  &:hover {
    color: ${({ theme }) => theme.colors.purple_normal_100};
  }
`;
