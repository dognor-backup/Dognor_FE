import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function CommunityList() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const location = useLocation();
  const pathLink = location.pathname.split("/");
  let currentPath = pathLink[pathLink.length - 1];

  const subMenuList = [
    { path: "all", label: "전체" },
    { path: "free", label: "자유게시판" },
    { path: "review", label: "병원 헌혈 후기" },
    { path: "question", label: "질문있어요" },
    { path: "thanks", label: "고마워요" },
    { path: "needbloods", label: "혈액이 필요해요", color: "red" },
  ];

  const communityTitles = [
    { path: "all", title: "모든 이야기 보기", subtitle: "" },
    { path: "free", title: "자유게시판", subtitle: "자유로운 주제로 소통할 수 있어요" },
    { path: "review", title: "병원 헌혈 후기", subtitle: "헌혈견 체험과 병원 경험에 대한 이야기 공간입니다" },
    { path: "question", title: "질문있어요!", subtitle: "다양한 궁금함을 풀어봐요. 그리고 여러 정보들을 공유해요" },
    { path: "thanks", title: "고마워요", subtitle: "감사함을 전하고 따뜻한 이야기를 알려주세요" },
    {
      path: "needbloods",
      title: "혈액이 필요해요",
      subtitle: "도움의 힘이 필요해요! D-Day가 가까워지고 있어요!\n 보호자님의 도움이 필요합니다!",
    },
  ];

  const getCurrentPathTitle = () => {
    setCurrentTitle(communityTitles.findIndex((communityTitle) => communityTitle.path.includes(currentPath)));
  };

  useEffect(() => {
    getCurrentPathTitle();
  }, [currentPath, getCurrentPathTitle]);

  return (
    <>
      <PageWrapper>
        <TitleText currentPath={currentPath}>{communityTitles[currentTitle].title}</TitleText>
        {communityTitles[currentTitle].subtitle.split("\n").map((text, idx) => (
          <SubText key={idx} currentPath={currentPath}>
            {text}
            <br />
          </SubText>
        ))}

        <MarginTop currentPath={currentPath}>
          <SubMenuBar subMenuList={subMenuList} />
        </MarginTop>
      </PageWrapper>
    </>
  );
}
const SubText = styled.span(
  ({ currentPath }) => `
  line-height: 30px;
  font-size: 18px;
  display: inline-block;
`
);
const TitleText = styled.h2(
  ({ theme, currentPath }) => `
font-size: 32px;
text-align: center;
font-weight: 700;
line-height: 42px;
padding-bottom: 16px;
color: ${currentPath === "needbloods" ? theme.colors.point_orange : theme.colors.neutrals_00}
`
);
const MarginTop = styled.div(
  ({ currentPath }) => `
  margin-top:${currentPath === "all" ? "0px" : "48px"}
`
);
