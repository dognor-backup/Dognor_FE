import styled from "@emotion/styled";
import One from "../../assets/icons/gray/1.svg?react";
import Two from "../../assets/icons/gray/2.svg?react";
import Three from "../../assets/icons/gray/3.svg?react";

export default function RoleCard({ title, content, number }) {
  return (
    <RoleCardLayout>
      <TextContainer>
        <TitleText>{title}</TitleText>
        <ContentText>{content}</ContentText>
      </TextContainer>
      <NumberContainer>
        {number === 3 ? <Three /> : number === 2 ? <Two /> : <One />}
      </NumberContainer>
    </RoleCardLayout>
  );
}

const RoleCardLayout = styled.div`
  position: relative;
  width: 321px;
  height: 232px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutrals_04};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_04};
  padding: 24px 0;
  z-index: 0;
`;

const TextContainer = styled.div`
  gap: 6px;
`;

const TitleText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const ContentText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const NumberContainer = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.colors.neutrals_04};
  font-size: 72px;
  right: 0;
  bottom: 24px;
`;
