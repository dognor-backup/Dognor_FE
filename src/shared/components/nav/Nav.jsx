import styled from "@emotion/styled";
import TopNavHeader from "./TopNavHeader";
import TopNavMenuContainer from "./TopNavMenuContainer";
import { useState } from "react";

export default function Nav() {
  const [activeMenuLink, setActiveMenuLink] = useState("");

  return (
    <NavLayout>
      <TopNavHeader activeMenuLink={activeMenuLink} />
      <TopNavMenuContainer
        activeMenuLink={activeMenuLink}
        setActiveMenuLink={setActiveMenuLink}
      />
    </NavLayout>
  );
}

const NavLayout = styled.div`
  width: 100%;
`;
