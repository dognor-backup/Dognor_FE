import styled from "@emotion/styled";
import PrimaryDogFoot from "../../assets/icons/primary/dog_foot_primary.svg?react";
import SecondaryDogFoot from "../../assets/icons/secondary/dog_foot_secondary.svg?react";
import RedDogFoot from "../../assets/icons/red/dog_foot_r.svg?react";

const dogFootIcons = {
  primary: PrimaryDogFoot,
  secondary: SecondaryDogFoot,
  red: RedDogFoot,
};

const borderColors = {
  primary: ({ theme }) => theme.colors.primary_blue,
  secondary: ({ theme }) => theme.colors.primary_purple,
  red: ({ theme }) => theme.colors.point_orange_normal_100,
};

export default function ShowcaseNoDataCard({
  color = "primary",
  text = "데이터가 없습니다.",
}) {
  const DogFootIcon = dogFootIcons[color];

  return (
    <ShowcaseNoDataCardLayout color={color}>
      <DogFootIcon />
      <ShowcaseText color={color}>
        {text.split("<br/>").map((line, index) => (
          <span key={index}>
            {line}
            {index !== text.split("<br/>").length - 1 && <br />}
          </span>
        ))}
      </ShowcaseText>
    </ShowcaseNoDataCardLayout>
  );
}

const ShowcaseNoDataCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 408px;
  border-radius: 16px;
  padding-bottom: 16px;
  gap: 8px;
  border: 2px solid ${({ color, theme }) => borderColors[color]({ theme })};
`;

const ShowcaseText = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  color: ${({ color, theme }) => borderColors[color]({ theme })};
  text-align: center;
  white-space: pre-line;
`;