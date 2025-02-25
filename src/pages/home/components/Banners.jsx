import styled from "@emotion/styled";
export function SecondBanner() {
  return (
    <>
      <NthBanner background="/src/assets/images/home_dog_new_live.svg" height="552px" width="870px">
        <TextContainer>
          <BannerTitle>
            DOG NEW LIFE 에서
            <br /> 반려견 헌혈문화를 만들어요
          </BannerTitle>
          <BannerText>
            강아지는 헌혈을 혼자 할 수 없어요.
            <br /> 보호자과 의료진의 도움이 필요합니다.
          </BannerText>
        </TextContainer>
      </NthBanner>
    </>
  );
}

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
  margin: 0 auto;
`
);
const BannerTitle = styled.strong`
  font-weight: 700;
  font-size: 28px;
  line-height: 42px;

  margin-bottom: 16px;
  display: inline-block;
  color: #170f49;
`;
const BannerText = styled.p`
  font-size: 400;
  line-height: 24px;
`;
const TextContainer = styled.div`
  width: 338px;
  text-align: center;
  position: absolute;
  right: -100px;
  top: 30%;
`;
