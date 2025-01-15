import styled from "@emotion/styled";

export default function AboutUs() {
  return (
    <AboutUsLayout>
      <DognorInfoContainer>
        <DognorTextWrapper>
          <DognorTextTitle>헌혈을 하게, 헌혈하는 강아지</DognorTextTitle>
          <DognorTextContent>
            공혈견 문제를 해결하고 헌혈 문화를 널리 알리기 위해 의료진, 반려동물
            보호자, 그리고 헌혈에 관심 있는 모든 이들이 소통할 수 있는
            커뮤니티와 정보 플랫폼
          </DognorTextContent>
        </DognorTextWrapper>
      </DognorInfoContainer>
    </AboutUsLayout>
  );
}

const AboutUsLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 130px 0;
`;

const DognorInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 48px 36px;
  gap: 8px;
  background-color: ${({ theme }) => {
    theme.colors.neutrals_01;
  }};
`;

const DognorTextWrapper = styled.div`
  text-align: start;
  height: 113px;
  gap: 13px;
  padding-right: 154px;
`;

const DognorTextTitle = styled.p`
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => {
    theme.colors.neutrals_08;
  }};
`;

const DognorTextContent = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  width: ;
  color: ${({ theme }) => {
    theme.colors.neutrals_08;
  }};
`;
