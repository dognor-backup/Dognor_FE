import { Notice } from "./Notice";
import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Community() {
  const [currentCategory, setCurrentCategory] = useState(0);

  return (
    <CommunityWrapper>
      <PageWrapper>
        <Notice />
        <Outlet context={{ currentCategory, setCurrentCategory }} />
      </PageWrapper>
    </CommunityWrapper>
  );
}
const CommunityWrapper = styled.div`
  height: 100vh;
`;
