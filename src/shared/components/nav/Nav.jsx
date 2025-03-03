import styled from "@emotion/styled";
import TopNavHeader from "./TopNavHeader";
import TopNavMenuContainer from "./TopNavMenuContainer";
import { useState } from "react";

export default function Nav() {
  const [activeMenuLink, setActiveMenuLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <NavLayout>
        <TopNavHeader
          activeMenuLink={activeMenuLink}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <TopNavMenuContainer
          activeMenuLink={activeMenuLink}
          setActiveMenuLink={setActiveMenuLink}
          isMenuOpen={isMenuOpen}
        />
      </NavLayout>
    </>
  );
}

const NavLayout = styled.div`
  width: 100%;
  min-width: 1080px;
  position: fixed;
  top: 0;

  z-index: 3;
`;
