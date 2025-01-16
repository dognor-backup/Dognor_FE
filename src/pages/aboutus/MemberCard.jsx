import styled from "@emotion/styled";
import GrayDogFoot from "../../assets/icons/gray/dog_foot_g.svg?react";
import PrimaryDogFoot from "../../assets/icons/primary/dog_foot_primary.svg?react";
import SecondaryDogFoot from "../../assets/icons/secondary/dog_foot_secondary.svg?react";
import RedDogFoot from "../../assets/icons/red/dog_foot_r.svg?react";

export default function MemberCard({ role, engName, korName, roleText }) {
  const icons = {
    frontend: <SecondaryDogFoot />,
    backend: <PrimaryDogFoot />,
    designer: <RedDogFoot />,
    default: <GrayDogFoot style={{ width: "66.67px", height: "63.33px" }} />,
  };

  return (
    <MemberCardLayout role={role}>
      <ImageContainer>{icons[role] || icons.default}</ImageContainer>
      <EngNameText>{engName}</EngNameText>
      <KorNameText>{korName}</KorNameText>
      <RoleText>{roleText}</RoleText>
    </MemberCardLayout>
  );
}

const MemberCardLayout = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 234px;
  height: 234px;
  padding: 16px;
  gap: 4px;
  border-radius: 16px;
  border: 1px solid
    ${({ role, theme }) =>
      role === "frontend"
        ? theme.colors.primary_purple
        : role === "backend"
        ? theme.colors.primary_blue
        : role === "designer"
        ? theme.colors.point_orange_normal_100
        : theme.colors.neutrals_04};
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const EngNameText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
`;

const KorNameText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
`;

const RoleText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
`;
