import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";

export default function DonationInfo() {
  return (
    <PageWrapper>
      <PageTop>
        <Title>반려견 헌혈에 대한 조건과 과정</Title>
      </PageTop>
      <Article>
        <InfoWrapper>
          <InfoSubTitle>
            <SubIcon></SubIcon>헌혈 가능 조건 및 금지 사항
          </InfoSubTitle>
          <ul>
            <InfoList>
              <InfoSum>2살~8살</InfoSum>
              <InfoText>헌혈이 가능한 나이</InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>25Kg이상 (대형견)</InfoSum>
              <InfoText>
                헌혈이 가능한 몸무게
                <br />
                7kg 이하를 소형견, 7~15kg 중형견, 15kg 이상 대형견으로 분류
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>매월 종합백신</InfoSum>
              <InfoText>
                매월 심장사상충과 내외부구충 예방, 정기적인 종합백신을 한 반려견
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>질병 이력 X</InfoSum>
              <InfoText>
                과거 심장사상충, 진드기매개질병, 바베시아, 혈액관련질병,
                바이러스관련 질병 이력 없는 반려견
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>헌혈일 2주전부터 치료약 복용 금지</InfoSum>
              <InfoText>
                심장사상충약, 구충약, 광견병주사, 종합백신 등 예방약은 1주일
                전부터 금지
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>생리 중 헌혈금지</InfoSum>
              <InfoText>
                생리중 또는 생리 전후 1개월 이내에 해당하는 경우, 헌혈금지
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>출산 1년 이후</InfoSum>
              <InfoText>출산 1년 이후부터 헌혈가능</InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>경정맥채혈 및 사지채혈 진행에 동의</InfoSum>
              <InfoText>채혈부위는 병원마다 상이합니다.</InfoText>
            </InfoList>
            <InfoList>
              <InfoSum>채혈부위 삭모 동의</InfoSum>
              <InfoText></InfoText>
            </InfoList>
          </ul>
        </InfoWrapper>

        <InfoWrapper>
          <InfoSubTitle>헌혈 과정</InfoSubTitle>

          <ul>
            <InfoList>
              <InfoSum num={1} narrow>
                사전 검사
              </InfoSum>
              <InfoText>
                헌금식 후 사전 검사를 하여 강아지 혈액형을 확인
                <br />
                심장사상충과 진드기 매개 질병 4종 검사, 혈액 검사, 빈혈 유발
                10종 병원체 PCR 검사
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum num={2} narrow>
                현혈 준비
              </InfoSum>
              <InfoText>
                사전검사 결과에 문제가 없어 헌혈을 해도 괜찮다는 진단을 받았다면
                헌혈 준비
                <br />
                손바닥 반 정도 크기로 채혈 부위 삭모 후 마취 크림을 도포해
                통증을 줄여준다.
                <br />
                당일 흥분도 및 긴장도에 따라 진정제가 사용될 수 있으며 이는
                의료진과 보호자 상의 하에 결정
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum num={3} narrow>
                채혈
              </InfoSum>
              <InfoText>
                채혈하는 양은 몸무게의 1~1.6% 정도이며, 헌혈하는 데 소요되는
                시간은 검사 시간을 포함해 2~3시간
              </InfoText>
            </InfoList>
            <InfoList>
              <InfoSum num={4} narrow>
                마무리
              </InfoSum>
              <InfoText>채혈 후에는 충분한 휴식을 취하고 귀가한다.</InfoText>
            </InfoList>
          </ul>
          <Info style={{ marginBottom: "16px" }}>
            상세한 과정은 병원마다 상이할 수 있습니다.
            <br />
            간혹 수혈받은 반려견 보호자를 바로 병원에서 만나게 되는 경우도
            있습니다.
          </Info>
        </InfoWrapper>
      </Article>
      <Article pdTop>
        <Title>강아지 헌혈에 대한 오해</Title>
        <GridBox>
          <GridLeft>
            <LeftItem>
              <GridTitle num={1}> 강아지 헌혈은 강아지에게 해롭다?</GridTitle>
              <InfoText>
                반려견이 적절한 횟수의 헌혈에 참여하는 것은 오히려 강아지의
                건강에 긍정적인 효과를 줍니다. <br />
                적혈구 생산을 자극해 피를 더 잘 만들어내 대사활성화에 도움이
                됩니다. <br />
                일반적으로 헌혈은 강아지 체중의 약 10~15% 정도의 몸이 자연적으로
                회복할 수 있는 범위로 헌혈을 진행합니다
              </InfoText>
            </LeftItem>
            <LeftItem>
              <GridTitle num={2}> 사람처럼 헌혈만 하나요?</GridTitle>
              <InfoText>
                기본적으로 필요한 혈액 검사, 엑스레이, 소변검사, 사상충 감염
                검사, 혈액 형 검사를 받으면서 혈액의 안정성과 반려견의 건강
                상태도 알 수 있어 안심할 수 있습니다.
              </InfoText>
            </LeftItem>
            <LeftItem>
              <GridTitle num={3}>
                헌혈을 하려면 강아지에게 마취를 해야한다?
              </GridTitle>
              <InfoText>
                대부분의 경우 강아지 헌혈에는 마취가 필요하지 않습니다.
                <br /> 채혈 부위에 마취 크림을 도포에 통증을 줄여줍니다. <br />
                당일에 흥분도 및 긴장도에 따라 진정제가 사용될 수 있으며 이는
                의료진과 보호자 상의 하에 결정됩니다.
              </InfoText>
            </LeftItem>
          </GridLeft>
          <GridRight></GridRight>
        </GridBox>
      </Article>
      <Article pdTop>
        <Title>강아지 혈액 상식</Title>
        <BgBoxes>
          <BgBox>
            <BgBoxLeft>DEA</BgBoxLeft>
            <InfoText>
              강아지 혈액형은 개 적혈구 항원(Dog Erythrocyte Antigen, 이하
              DEA)에 숫자를 붙여서 표현합니다.
            </InfoText>
          </BgBox>
          <BgBox>
            <BgBoxLeft>
              13개의 혈액형
              <br /> DEA1형과 3~8형
            </BgBoxLeft>
            <InfoText>
              현재까지 밝혀진 강아지 혈액형은 총 13개로 구분되며 앞으로 더 많은
              혈액형으로 구분될 수 있습니다.
              <br /> 13가지 중 주요 혈액형은 아래 7가지입니다.
            </InfoText>
          </BgBox>
          <BgBox>
            <BgBoxLeft>
              “DEA1-형”, 사람 O형처럼
              <br />
              유니버설 블러드
            </BgBoxLeft>
            <InfoText>
              DEA1-형은 사람 O형처럼 유니버설 블러드이며, 항원이 없어서 수혈할
              때 항원항체 반응을 일으키지 않아 모든 강아지에게 수혈할 수
              있습니다.
              <br />
              DEA1.1형, DEA1.2형은 수혈할 때 혈액형이 일치하지 않으면 부작용이
              심합니다. 그래서 DEA1-형은 DEA1-형에게, DEA1.1형은 DEA1.1형과
              DEA1-형에게, DEA1.2형은 DEA1.2형과 DEA1-형에게 수혈받을 수
              있습니다.
            </InfoText>
          </BgBox>
          <BgBox>
            <BgBoxLeft>자연발생항체가 없음</BgBoxLeft>
            <InfoText>
              생애최초로 단 한 번만 혈액형이 달라도 수혈받을 수 있습니다. 단 첫
              수혈 뒤엔 해당 혈액형에 대한 항체가 생기기 때문에 두 번째
              수혈부터는 꼭 혈액형이 일치해야 합니다.
            </InfoText>
          </BgBox>
        </BgBoxes>
      </Article>
    </PageWrapper>
  );
}

const Title = styled.h2(
  ({ theme }) => `
  color:${theme.colors.neutrals_00};
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom:48px;
  `
);
const InfoWrapper = styled.div(
  ({ theme }) => `
  border: 2px solid ${theme.colors.neutrals_05};
  box-shadow: 4px 4px 16px 0 rgba(0,0,0,0.25);
  padding: 32px 24px 64px 24px;
  border-radius: 16px;
  margin-top: 48px;
  position: relative;

  &::after {
  content: '';
  position: absolute;
  display:  inline-block;
  width: 32px;
  height: 32px;
  bottom: 32px;
  right: 24px;
  background : url("/src/assets/icons/gray/dog_foot_g.svg");
  background-size: contain;
}
`
);
const InfoSubTitle = styled.strong(
  ({ theme }) => `
  color: ${theme.colors.primary_purple};
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  display: block;
  margin-bottom: 56px;
`
);
const InfoList = styled.li(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.colors.neutrals_05};
  min-height: 36px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 6px;
`
);

const InfoSum = styled.span(
  ({ theme, num, narrow }) => `
  display: inline-block;
  width: ${narrow ? "220px" : "330px"};
  font-weight: 700;
  font-size: 18px;
  color: ${theme.colors.neutrals_00};
  position: relative;
  padding-left: 48px;
  margin-right: 28px;
 &::before {
  content:"";
  color: ${num ? `${theme.colors.primary_purple}` : "inherit"};
  position: absolute;
  display:  inline-block;
  width: 24px;
  height: 24px;
  bottom: -4px;
  left: 0;
  background : ${
    !num
      ? "url('/src/assets/icons/secondary/check_secondary.svg')"
      : `url('/src/assets/icons/number/purple_num${num}.svg')`
  };
  background-repeat: no-repeat;
  background-position: center;
  }
`
);
const InfoText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
const Article = styled.div(
  ({ pdTop }) => `
  padding-bottom: 100px;
  padding-top: ${pdTop ? "100px" : 0}
`
);
const SubIcon = styled.span`
  display: inline-block;
  position: relative;
  left: -14px;
  top: 8px;
  width: 32px;
  height: 32px;
  background: url("/src/assets/icons/subicon/tv_options_edit_channels.svg");
`;
const Info = styled.p`
  text-align: right;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
const GridBox = styled.div`
  display: flex;
  gap: 24px;
  height: 560px;
`;
const GridLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 24px;
`;
const LeftItem = styled.div(
  ({ theme }) => `
  flex-grow: 1;
  border: 2px solid ${theme.colors.neutrals_05};
  box-shadow: 4px 4px 16px 0 rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 24px;
`
);
const GridRight = styled.div`
  width: 234px;
  border-radius: 16px;
  background-image: url("/src/assets/images/donationInfo.svg");
`;
const GridTitle = styled.div(
  ({ theme, num }) => `
  color: ${theme.colors.neutrals_01};
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  &::before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url("/src/assets/icons/number/navy_num${num}.svg");
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 6px
 }
`
);
const BgBox = styled.div(
  ({ theme }) => `
  background-color: ${theme.colors.neutrals_07};
  border: 2px solid ${theme.colors.neutrals_05};
  padding: 32px;
  border-radius: 16px;
  display: flex;
  padding: 32px;
  border-radius: 16px;
  align-items: center;
  position: relative;
  display: grid;
  grid-template-columns: 260px auto;
  gap: 55px;
  &::before {
  content: "";
  display: inline-block;
  border: 0.5px solid ${theme.colors.neutrals_04};
  position: absolute;
  height: calc(100% - 64px);
  left: 300px;
  margin: 0 20px;
  }
`
);
const BgBoxes = styled.div(
  ({ theme }) => `
  flex-direction: column;
  display: flex;
  gap: 24px;
 `
);
const BgBoxLeft = styled.span(
  ({ theme }) => `
  color: ${theme.colors.neutrals_01};
  display: inline-block;
  font-size: 18px;
  min-width: 260px;
  position: relative;
  font-weight: 700;
  line-height: 24px;
`
);
