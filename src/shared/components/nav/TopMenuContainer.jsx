import React from "react";
import { TopMenuBtn } from "./TopMenuBtn";
import styled from "@emotion/styled";

export default function TopMenuContainer() {
  return (
    <TopMenuLayout>
      <TopMenuBtn>헌혈 안내</TopMenuBtn>
      <TopMenuBtn>병원소식</TopMenuBtn>
      <TopMenuBtn>헌혈견 자랑</TopMenuBtn>
      <TopMenuBtn>커뮤니티</TopMenuBtn>
      <TopMenuBtn>캠페인</TopMenuBtn>
      <TopMenuBtn>About Us</TopMenuBtn>
    </TopMenuLayout>
  );
}

const TopMenuLayout = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 8px 36px;
  gap: 24px;
`;
