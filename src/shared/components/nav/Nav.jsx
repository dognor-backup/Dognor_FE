import styled from "@emotion/styled";
import TopNavHeader from "./TopNavHeader";
import TopNavMenuContainer from "./TopNavMenuContainer";

export default function Nav() {
  return (
    <NavLayout>
      <TopNavHeader />
      <TopNavMenuContainer />
    </NavLayout>
  );
}

const NavLayout = styled.div`
  width: 100%;
`;
