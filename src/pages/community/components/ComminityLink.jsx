import { Button } from "@/shared/components/buttons/Button";
import styled from "@emotion/styled";
import { useNavigate, useOutletContext } from "react-router-dom";

export function CommunityLink() {
  const navigate = useNavigate();

  const { setCurrentCategory } = useOutletContext();

  const handleGetCategoryCd = (e) => {
    setCurrentCategory(e.currentTarget.dataset.category * 1);
  };

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
          <BoxIcon background="/src/assets/icons/subicon/local_hospital.svg"></BoxIcon>
          <BoxTitle color="#4A3AFF">병원 헌혈 후기</BoxTitle>
          <BoxText color="#4A3AFF">
            헌혈견 체험과 병원 경험에
            <br />
            대한 이야기 공간
          </BoxText>
        </GridItem>
        <GridItem bgColor="#170F49" borderColor="#fff" data-category="5" onClick={() => navigate("/community/thanks")}>
          <BoxIcon background="/src/assets/icons/subicon/diversity_4.svg"></BoxIcon>
          <BoxTitle color="#fff">고마워요</BoxTitle>
          <BoxText color="#fff">
            감사함을 전하고
            <br />
            따뜻한 이야기를 알려주세요
          </BoxText>
        </GridItem>
        <GridItem
          bgColor="#FEEDED"
          borderColor="#F64D4D"
          data-category="6"
          onClick={() => navigate("/community/needbloods")}
        >
          <BoxIcon background="/src/assets/icons/subicon/bloodtype_red.svg"></BoxIcon>
          <BoxTitle color="#F64D4D">혈액이 필요해요</BoxTitle>
          <BoxText color="#F64D4D">
            도움의 힘이 필요해요!
            <br />
            보호자님의 도움이 필요합니다!
          </BoxText>
        </GridItem>
      </GridContainer>
      <FlexItems>
        <GridItem
          bgColor="#A0A3BD"
          borderColor="#fff"
          data-category="4"
          onClick={() => navigate("/community/question")}
        >
          <BoxIcon background="/src/assets/icons/subicon/feedback.svg"></BoxIcon>
          <BoxTitle color="#fff">질문있어요!</BoxTitle>
          <BoxText color="#fff">
            다양한 궁금함을 풀어봐요.
            <br />
            그리고 여러 정보들을 공유해요
          </BoxText>
        </GridItem>
        <GridItem bgColor="#EDEBFF" borderColor="#fff" data-category="2" onClick={() => navigate("/community/all")}>
          <BoxIcon background="/src/assets/icons/subicon/diversity_3.svg"></BoxIcon>
          <BoxTitle color="#170F49">자유게시판</BoxTitle>
          <BoxText color="#170F49">자유로운 주제로 소통하는 공간입니다.</BoxText>
        </GridItem>
      </FlexItems>
      <BtnsContainer>
        <Button style={{ width: "320px" }} variant="primary" size="medium" state="default">
          글 작성하기
        </Button>
        <Button style={{ width: "320px" }} variant="primary" size="medium" state="outline">
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
const BoxIcon = styled.span(
  ({ background }) => `
  background: url(${background})no-repeat;
  background-size: contain;
  display: inline-block;
  width: 40px;
  height: 40px;
`
);
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
color: ${color}

`
);
const BtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 32px;
`;
