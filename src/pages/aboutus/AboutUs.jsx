import styled from "@emotion/styled";
import RoleCard from "./RoleCard";
import QuoteLeft from "../../assets/icons/black/QuoteLeft.svg?react";
import QuoteRight from "../../assets/icons/black/QuoteRight.svg?react";
import PurposeCard from "./PurposeCard";

export default function AboutUs() {
  const roleList = [
    {
      title: "정보제공",
      content:
        "누구나 쉽고 편리하게 헌혈 관련 정보를 얻고, 실제 헌혈 과정에 참여할 수 있도록 돕습니다.",
    },
    {
      title: "커뮤니티 연결",
      content:
        "의료진, 반려동물 보호자, 헌혈견에 관심 있는 사용자가 함께 소통하며 경험과 지식을 나눌 수 있는 안전하고 따뜻한 공간을 제공합니다.",
    },
    {
      title: "의식 개선",
      content:
        "공혈견의 현실을 알리고, 이를 대체할 수 있는 새로운 대안을 제시하며 동물 복지 문화를 선도합니다.",
    },
  ];

  const purposeList = [
    {
      title: "공혈견 없는 세상",
      content:
        "공혈견이 아닌 자발적 헌혈 문화를 확산시켜, 강아지들이 헌혈로 인한 고통을 겪지 않아도 되는 사회를 실현합니다.",
    },
    {
      title: "헌혈 생태계의 중심 플랫폼",
      content:
        "반려동물 헌혈에 필요한 정보와 자원을 한곳에 모아 헌혈을 활성화하고, 헌혈 관련 의료진과 보호자들이 신뢰하고 활용하는 대표적인 플랫폼이 되는 것을 목표로 합니다.",
    },
    {
      title: "의료진과 보호자 간의 협력 증대",
      content:
        "커뮤니티 기능을 통해 의료진과 반려동물 보호자, 그리고 관심 있는 일반 사용자가 소통하며 서로 도움을 주고받는 협력 생태계를 구축합니다.",
    },
    {
      title: "글로벌 헌혈 네트워크 확장",
      content:
        "국내를 넘어 글로벌 시장에서도 공혈견 문제 해결과 헌혈 문화 개선에 기여하며, 국제적인 협력 모델을 만들어 나갑니다.",
    },
    {
      title: "반려동물 복지 선도",
      content:
        "동물 복지에 대한 인식을 확산시키고, 공혈견 문제를 포함해 더 나은 반려동물 의료 환경과 문화를 조성합니다.",
    },
  ];
  return (
    <AboutUsLayout>
      <DognorInfoWrapper>
        <DognorLogoText>헌혈하개</DognorLogoText>
        <DognorTextContainer>
          <DognorTextTitle>헌혈을 하게, 헌혈하는 강아지</DognorTextTitle>
          <DognorTextContent>
            공혈견 문제를 해결하고 헌혈 문화를 널리 알리기 위해 의료진, 반려동물
            보호자, 그리고 헌혈에 관심 있는 모든 이들이 소통할 수 있는 입니다
            커뮤니티와 정보 플랫폼
          </DognorTextContent>
        </DognorTextContainer>
      </DognorInfoWrapper>
      <DognorRoleWrapper>
        <DognorRoleTextContainer>
          <DognorRoleTextTitle>
            <HighlightedText>
              <QuoteLeft />
              헌혈하개
              <QuoteRight />
            </HighlightedText>
            의 역할
          </DognorRoleTextTitle>
          <DognorRoleTextContent>
            정보 제공뿐만 아니라 다양한 참여자들이 서로 도움을 주고받고,
            <br /> 헌혈 문화에 대한 깊이 있는 논의를 나눌 수 있는 공간
          </DognorRoleTextContent>
        </DognorRoleTextContainer>
        <RoleCardContainer>
          {roleList.map((role, index) => (
            <RoleCard
              key={index}
              title={role.title}
              content={role.content}
              number={index + 1}
            />
          ))}
        </RoleCardContainer>
      </DognorRoleWrapper>
      <PurposeWrapper>
        <PurposeTextContainer>
          <PurposeTextTitle>비전과 목표</PurposeTextTitle>
          <PurposeTextContent>
            혈견 문제를 해결하고 헌혈 문화를 활성화함으로써
            <br /> 생명 존중의 가치를 실현하는 플랫폼으로 자리 잡는 것입니다.
          </PurposeTextContent>
        </PurposeTextContainer>
        <PurposeCardContainer>
          {purposeList.map((purpose, index) => (
            <PurposeCard
              key={index}
              number={index + 1}
              title={purpose.title}
              content={purpose.content}
            />
          ))}
        </PurposeCardContainer>
      </PurposeWrapper>
    </AboutUsLayout>
  );
}

const AboutUsLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 130px;
`;

const DognorInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 36px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutrals_01};
`;

const DognorTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  height: 113px;
  gap: 13px;
  width: 356px;
`;

const DognorLogoText = styled.p`
  font-family: "BMJUA";
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  width: 356px;
  color: ${({ theme }) => theme.colors.neutrals_08};
`;

const DognorTextTitle = styled.p`
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme.colors.neutrals_08};
`;

const DognorTextContent = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_08};
`;

const DognorRoleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  gap: 48px;
`;

const DognorRoleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DognorRoleTextTitle = styled.p`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  text-align: center;
`;

const DognorRoleTextContent = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
`;

const HighlightedText = styled.span`
  display: flex;
  gap: 4px;
  font-family: "BMJUA";
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary_blue};
`;

const RoleCardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 36px;
  gap: 24px;
`;

const PurposeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(160, 163, 189, 1) 0%,
    rgba(160, 163, 189, 0) 100%
  );
  padding: 100px 36px;
  gap: 48px;
`;

const PurposeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
`;

const PurposeTextTitle = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PurposeTextContent = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PurposeCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: center;
`;

const MemberInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 36px;
  gap: 24px;
`;
