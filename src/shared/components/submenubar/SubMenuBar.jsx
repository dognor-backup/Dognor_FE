import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SubMenuBar({ subMenuList }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubMenuClick = (menu) => {
    setActiveSubMenu(menu);
    const currentPath = location.pathname.split("/").slice(0, 2).join("/");
    if (menu === "") {
      navigate(`${currentPath}`);
    } else {
      navigate(`${currentPath}/${menu}`);
    }
  };
  const getInitialActiveMenu = () => {
    const currentPath = location.pathname.split("/").slice(2).join("/");
    return subMenuList.find((menu) => menu.path === currentPath)?.path || null;
  };

  useEffect(() => {
    setActiveSubMenu(getInitialActiveMenu());
  }, [location.pathname]);

  return (
    <SubMenuBarLayout>
      {subMenuList.map((menu) => (
        <SubMenuBarBtn
          key={menu.path}
          data-label={menu.label}
          isActive={activeSubMenu === menu.path}
          onClick={() => {
            handleSubMenuClick(menu.path);
          }}
          color={menu.color}
        >
          {menu.label}
        </SubMenuBarBtn>
      ))}
    </SubMenuBarLayout>
  );
}

const SubMenuBarLayout = styled.div`
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_04};
  border-radius: 30px;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.neutrals_08};
`;

const SubMenuBarBtn = styled.button`
  padding: 8px 24px;
  color: ${({ isActive, theme, color }) =>
    isActive
      ? theme.colors.primary_blue
      : color === "red"
      ? theme.colors.point_orange_normal_100
      : theme.colors.neutrals_03};
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.blue_light_200 : theme.colors.neutrals_08)};
  border-radius: 20px;
  border: ${({ isActive, theme }) => (isActive ? `1px solid ${theme.colors.primary_blue}` : "1px solid transparent")};
  text-align: center;
  font-size: 18px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  &:hover {
    color: ${({ theme }) => theme.colors.purple_normal_100};
    font-weight: 700;
  }
`;
