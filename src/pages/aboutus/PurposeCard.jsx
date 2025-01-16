import styled from "@emotion/styled";

export default function PurposeCard({ number, title, content }) {
  return (
    <PurposeCardLayout>
      <PurposeCardNumber>{number}</PurposeCardNumber>
      <PurposeCardTitleText>{title}</PurposeCardTitleText>
      <PurposeCardContentText>{content}</PurposeCardContentText>
    </PurposeCardLayout>
  );
}

const PurposeCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 234px;
  border-radius: 16px;
  padding: 16px;
  grid-gap: 20px;
  background-color: ${({ theme }) => theme.colors.neutrals_08};
`;

const PurposeCardNumber = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.primary_purple};
  color: ${({ theme }) => theme.colors.neutrals_08};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  font-weight: 700;
  font-size: 18px;
`;

const PurposeCardTitleText = styled.p`
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
`;

const PurposeCardContentText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;
