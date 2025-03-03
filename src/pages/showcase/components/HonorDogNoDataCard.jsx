import styled from "@emotion/styled";
import KingDog from "../../../assets/icons/subicon/king_of_dog.svg?react";

export default function HonorDogNoDataCard() {
  return (
    <HonorDogNoDataCardLayout>
      <KingDog />
      <HonorDogNoDataCardMainText>
        “ 헌혈견의 숭고한 활동을 기리기 위해 마련된 명예견을 기다리는 중 입니다”
      </HonorDogNoDataCardMainText>
      <HonorDogNoDataCardSubText>
        현재 기준에 가까운 훌륭한 헌혈견들이 점차 늘어나고 있으며,
        <br /> 명예견으로 선정될 자격을 갖춘 견이 나오기를 기대하고 있습니다.
      </HonorDogNoDataCardSubText>
    </HonorDogNoDataCardLayout>
  );
}

const HonorDogNoDataCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1008px;
  height: 314px;
  border-radius: 16px;
  padding: 16px;
  gap: 24px;
  background-color: #ffffff;
  border: 1px solid #d9dbe9;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
`;

const HonorDogNoDataCardMainText = styled.p`
  font-size: 24px;
  font-weight: 700;
  line-height-step: 34px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary_blue};
`;

const HonorDogNoDataCardSubText = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  color: #514f6e;
`;
