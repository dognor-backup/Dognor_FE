import React from "react";
import { TopMenuBtn } from "./TopMenuBtn";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function TopMenuContainer() {
  return (
    <TopMenuLayout>
      <TopMenuBtn>헌혈 안내</TopMenuBtn>
      <TopMenuBtn>병원소식</TopMenuBtn>
      <TopMenuBtn>헌혈견 자랑</TopMenuBtn>
      <TopMenuBtn>커뮤니티</TopMenuBtn>
      <TopMenuBtn>캠페인</TopMenuBtn>
      <TopMenuBtn>About Us</TopMenuBtn>
      <TopMenuLink>링크</TopMenuLink>
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

const TopMenuLink = styled(Link)`
  text-decoration: none;
  min-width: 95px;
  padding: 8px;
  gap: 8px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue_dark_400};
  background-color: transparent;
  &:hover {
    background-color: lavender;
  }
  &:focus {
    background-color: black;
  }
`;
