import { Button } from "@/shared/components/buttons/Button";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useGetUserId } from "../../../domains/post/hooks/useGetUserId";
import styled from "@emotion/styled";
import Hospital from "/src/assets/icons/subicon/local_hospital.svg?react";
import Thanks from "/src/assets/icons/subicon/diversity_4.svg?react";
import Bloods from "/src/assets/icons/subicon/bloodtype_red.svg?react";
import Question from "/src/assets/icons/subicon/feedback.svg?react";
import Free from "/src/assets/icons/subicon/diversity_3.svg?react";

export function CommunityLink() {
  const navigate = useNavigate();
  const { userId } = useGetUserId() || {};
  const { setCurrentCategory } = useOutletContext();
  const handleGetCategoryCd = (e) => setCurrentCategory(e.currentTarget.dataset.category * 1);
  const boxColor = ["#4A3AFF", "#fff", "#F64D4D", "#170F49"];
  const boxTitle = ["병원 헌혈 후기", "고마워요", "혈액이 필요해요", "질문있어요!", "자유게시판"];
  const boxText = [
    "헌혈견 체험과 병원 경험에\n대한 이야기 공간",
    "감사함을 전하고\n따뜻한 이야기를 알려주세요",
    "도움의 힘이 필요해요!\n보호자님의 도움이 필요합니다!",
    "다양한 궁금함을 풀어봐요.\n그리고 여러 정보들을 공유해요",
    "자유로운 주제로 소통하는 공간입니다.",
  ];

  return (
    <>
      <CommunityTitle>커뮤니티 게시판</CommunityTitle>
      <GridContainer>
        <GridItem
          bgColor="#fff"
          data-category="3"
          borderColor="#4A3AFF"
          onClick={(e) => {
            navigate("/community/review");
            handleGetCategoryCd(e);
          }}
        >
          <BoxIcon>
            <Hospital style={{ width: "45px" }} />
          </BoxIcon>
          <BoxTitle color={boxColor[0]}>{boxTitle[0]}</BoxTitle>
          <BoxText color={boxColor[0]}>{boxText[0]}</BoxText>
        </GridItem>

        <GridItem
          bgColor="#170F49"
          borderColor={boxColor[1]}
          data-category="5"
          onClick={() => navigate("/community/thanks")}
        >
          <BoxIcon>
            <Thanks style={{ width: "45px" }} />
          </BoxIcon>
          <BoxTitle color={boxColor[1]}>{boxTitle[1]}</BoxTitle>
          <BoxText color={boxColor[1]}>{boxText[1]}</BoxText>
        </GridItem>

        <GridItem
          bgColor="#FEEDED"
          borderColor="#F64D4D"
          data-category="6"
          onClick={() => navigate("/community/needbloods")}
        >
          <BoxIcon>
            <Bloods />
          </BoxIcon>
          <BoxTitle color={boxColor[2]}>{boxTitle[2]}</BoxTitle>
          <BoxText color={boxColor[2]}>{boxText[2]}</BoxText>
        </GridItem>
      </GridContainer>
      <FlexItems>
        <GridItem
          bgColor="#A0A3BD"
          borderColor="#fff"
          data-category="4"
          onClick={() => navigate("/community/question")}
        >
          <BoxIcon>
            <Question />
          </BoxIcon>
          <BoxTitle color={boxColor[1]}>{boxTitle[3]}</BoxTitle>
          <BoxText color={boxColor[1]}>{boxText[3]}</BoxText>
        </GridItem>
        <GridItem bgColor="#EDEBFF" borderColor="#fff" data-category="2" onClick={() => navigate("/community/all")}>
          <BoxIcon>
            <Free />
          </BoxIcon>
          <BoxTitle color={boxColor[3]}>{boxTitle[4]}</BoxTitle>
          <BoxText color={boxColor[3]}>{boxText[4]}</BoxText>
        </GridItem>
      </FlexItems>

      <BtnsContainer>
        <Button
          style={{ width: "320px" }}
          variant="primary"
          size="medium"
          state="default"
          onClick={() => (!userId ? navigate("/login") : navigate("/postnew"))}
        >
          글 작성하기
        </Button>
        <Button
          style={{ width: "320px" }}
          variant="primary"
          size="medium"
          state="outline"
          onClick={() => navigate("/community/all")}
        >
          전체 글 보기
        </Button>
      </BtnsContainer>
    </>
  );
}

const CommunityTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 80px;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
`;
const GridItem = styled.div(
  ({ bgColor, borderColor, theme }) => `
  background-color: ${bgColor};
  padding: 20px;
  text-align: center;
  border-radius: 16px;
  flex-grow: 1;
  height: 220px;
  padding: 30px;
  box-sizing: border-box;
  border: 4px solid ${borderColor};
  box-shadow: ${theme.shadow};
  cursor: pointer;
  `
);
const FlexItems = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  width: 100%;
`;
const BoxIcon = styled.span`
  display: inline-block;
`;

const BoxTitle = styled.h4(
  ({ color }) => `
  font-weight: 700;
  font-size: 22px;
  margin: 16px 0;
  color: ${color}
`
);
const BoxText = styled.p(
  ({ color }) => `
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: ${color};
  white-space: pre-line;
`
);
const BtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
`;
