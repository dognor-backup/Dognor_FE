import styled from "@emotion/styled";
import OneIcon from "../../assets/icons/number/1_W_H05.svg?react";
import TwoIcon from "../../assets/icons/number/2_W_H05.svg?react";
import ThreeIcon from "../../assets/icons/number/3_W_H05.svg?react";
import FourIcon from "../../assets/icons/number/4_W_H05.svg?react";
import FiveIcon from "../../assets/icons/number/5_W_H05.svg?react";

export default function PurposeCard({ number, title, content }) {
  const Number = [
    <OneIcon key={number} />,
    <TwoIcon key={number} />,
    <ThreeIcon key={number} />,
    <FourIcon key={number} />,
    <FiveIcon key={number} />,
  ];
  return (
    <PurposeCardLayout>
      <PurposeCardNumber>{Number[number]}</PurposeCardNumber>
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
