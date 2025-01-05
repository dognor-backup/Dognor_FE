import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function TopNavMenuContainer({
  activeMenuLink,
  setActiveMenuLink,
}) {
  const menuList = [
    {
      engTitle: "donationinfo",
      korTitle: "헌혈견 안내",
    },
    {
      engTitle: "map",
      korTitle: "병원소식",
    },
    {
      engTitle: "showcase",
      korTitle: "헌혈견 자랑",
    },
    {
      engTitle: "community",
      korTitle: "커뮤니티",
    },
    {
      engTitle: "campaigns",
      korTitle: "캠페인",
    },
    {
      engTitle: "aboutus",
      korTitle: "About us",
    },
  ];

  return (
    <TopNavMenuLayout>
      {menuList.map((menu, index) => (
        <TopNavMenuLink
          key={index}
          isActive={activeMenuLink === menu.engTitle}
          onClick={() => setActiveMenuLink(menu.engTitle)}
          to={menu.engTitle}
        >
          {menu.korTitle}
        </TopNavMenuLink>
      ))}
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
