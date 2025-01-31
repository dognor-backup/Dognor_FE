import { Notice } from "./Notice";
import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

export default function Community() {
  return (
    <CommunityWrapper>
      <PageWrapper>
        <Notice />
        <Outlet />
      </PageWrapper>
    </CommunityWrapper>
  );
}
const CommunityWrapper = styled.div`
  height: 100vh;
`;
