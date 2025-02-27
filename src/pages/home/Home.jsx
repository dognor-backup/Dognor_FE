import styled from "@emotion/styled";
import { LinkCard, TextCard, WideCard } from "./components/LinkCard";
import { Tag } from "./components/Tag";
import { TopBanner } from "./components/TopBanner";
import TagCardsHome from "./components/TagCardHome";
import { useNavigate } from "react-router-dom";
import PostCardsHome from "./components/PostCardHome";
import { SecondBanner } from "./components/Banners";
import { cardData, TagText, cardData2 } from "./data/cardData";
import { formatText } from "@/shared/utils/formatText";
export default function Home() {
  const navigate = useNavigate();
  const handleClickCard = (e, path) => {
    console.log(path);
    e.stopPropagation();
    e.preventDefault();
    navigate(`/${path}`);
  };

  return (
    <>
      <MainWrapper>
        <TopBanner />
        <SecondBanner />
        <MainContainer>
          <CardContainer grid={3} height="358px">
            {cardData?.map((card, index) =>
              card.type === "text" ? (
                <TextCard key={index} color={card.color} title={formatText(card.title)} text={formatText(card.text)} />
              ) : (
                <LinkCard
                  key={index}
                  background={card.background}
                  title={formatText(card.title)}
                  btnText={card.btnText}
                />
              )
            )}
          </CardContainer>
          <SubTitle>공혈견의 문제와 필요성</SubTitle>
          <SubText>
            1. 수혈 전용으로 길러지는 강아지, <span style={{ color: "#F64D4D" }}>“공혈견”</span>을 알고있나요?
          </SubText>
          <HashTagImg />

          <HashTagContainer>
            <Tag color="red">{TagText[0]}</Tag>
            <Tag color="red">{TagText[1]}</Tag>
            <Tag color="red">{TagText[2]}</Tag>
            <Tag color="red">{TagText[3]}</Tag>
            <Tag color="red">{TagText[4]}</Tag>
            <Tag color="red">{TagText[5]}</Tag>
          </HashTagContainer>

          <Border>
            <SubText>2. 왜? 공혈견을 찾는 이유는?</SubText>
            <HashTagContainer>
              <Tag>{TagText[0]}</Tag>
              <Tag>{TagText[1]}</Tag>
              <Tag>{TagText[2]}</Tag>
              <Text>
                반려견도 외과 수술, 교통사고, 출산 중 대량 출혈, 빈혈 등의 문제가 발생했을 때 긴급 수혈이 필요, 그러나
                사람과 달리 강아지들은 공적인 혈액 은행이 없고 장기 보존이 불가능 하기 때문에 수혈용 혈액을 안정적으로
                확보하기 위해서 공혈견이 필요합니다.
              </Text>
            </HashTagContainer>
          </Border>

          <SubText>3. 우리 반려견이 헌혈을 함께 해준다면?</SubText>
          <NthBanner
            background="/src/assets/images/home_dog_return.svg"
            height="366px"
            style={{ margin: " 0 auto", marginBottom: "100px" }}
          ></NthBanner>

          <CardContainer grid={2} height="288px">
            {cardData2?.map((card, index) => (
              <LinkCard
                key={index}
                background={card.background}
                title={formatText(card.title)}
                btnText={card.btnText}
                color={card.color}
                btnColor={card.btnColor}
              />
            ))}
          </CardContainer>

          <div>
            <SubTitle>우리들의 헌혈 동료들</SubTitle>
            <Text bold>
              우리 반려견들이 다른 친구들을 살리는 멋진일을 하고 있어요 <br />
              여러분도 같이해요
            </Text>
            <LongBtn onClick={() => navigate("/showcase")}>더 많은 헌혈 동료들 만나보기</LongBtn>
            <CardContainer grid={3} padding={"btm"}>
              <PostCardsHome onClick={(e) => handleClickCard(e, "showcase")} />
            </CardContainer>
          </div>
          <WideCard
            background="/src/assets/images/card03.svg"
            btnText="헌혈견 안내 페이지 가기"
            color="#170F49"
            btnColor="red"
            noBtm
            title={
              <>
                강아지 헌혈이란?
                <br />
                #조건과 방법
              </>
            }
          ></WideCard>
          <div>
            <SubTitle>“헌혈하개”에서 만나볼 수 있는 캠페인</SubTitle>
            <Text bold>다양한 캠페인을 진행하고 있습니다</Text>
            <LongBtn onClick={() => navigate("/campaigns")}>캠페인 더보기</LongBtn>
            <CardContainer grid={3} padding={"btm"}>
              <TagCardsHome onClick={(e) => handleClickCard(e, "campaigns")} />
            </CardContainer>
          </div>
        </MainContainer>
      </MainWrapper>
    </>
  );
}

const MainWrapper = styled.div`
  margin-top: 130px;
`;
const MainContainer = styled.div`
  max-width: 1008px;
  margin: 0 auto;
  text-align: center;
`;

const NthBanner = styled.div(
  ({ background, height }) =>
    `
  height: ${height};
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  width: 870px;
  position: relative;
  z-index: 0;
`
);

const CardContainer = styled.div(
  ({ grid, height, padding }) => `
  display: grid;
  gap: 18px;
  height: ${height};
  grid-template-columns: repeat(${grid}, 1fr);
  padding: ${padding === "btm" ? "0 0 100px 0" : "24px 36px"}
`
);
const SubTitle = styled.h2(
  ({ theme }) => `
color: ${theme.colors.neutrals_00};
font-size: 32px;
font-weight: 700;
margin-top: 100px;
`
);
const SubText = styled.h2(
  ({ theme }) => `
color: ${theme.colors.neutrals_00};
font-size: 24px;
font-weight: 700;
margin-top: 48px;
margin-bottom: 32px;
`
);

const HashTagImg = styled.div`
  width: 264px;
  height: 160px;
  background-image: url("/src/assets/images/home_dog_blood.svg");
  margin: 0 auto;
  margin-top: 35px;
  margin-bottom: 32px;
`;
const HashTagContainer = styled.div`
  padding-bottom: 48px;
`;
const Text = styled.p(
  ({ bold }) =>
    `
  font-size: 18px;
  line-height: 30px;
  width: 720px;
  margin: 0 auto;
  margin-top: 32px;
  font-weight: ${bold ? "700" : "400"}
`
);
const Border = styled.div(
  ({ theme }) => `
border-top: 1px dashed ${theme.colors.neutrals_04};
border-bottom: 1px dashed ${theme.colors.neutrals_04}`
);
const LongBtn = styled.button(
  ({ theme }) => `
  width: 320px;
  height: 36px;
  background-color: ${theme.colors.primary_purple};
  color:  ${theme.colors.neutrals_08};
  border-radius: 6px;
  font-weight: 700;
  margin: 32px 0;
`
);
