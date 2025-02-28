import styled from "@emotion/styled";
import KingDog from "../../../../assets/icons/subicon/king_of_dog_p.svg?react";

export default function HonorDogCard({ imageUrl, name }) {
  return (
    <CardWrapper>
      <IconWrapper>
        <KingDog />
      </IconWrapper>
      <CardContainer>
        <ImageWrapper>
          <DogImage src={imageUrl} alt={name} />
        </ImageWrapper>
        <DogName>{name}</DogName>
      </CardContainer>
    </CardWrapper>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 234px;
  height: 314px;
  background-color: white;
  border-radius: 24px;
  padding: 0 16px 16px 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 160px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ImageWrapper = styled.div`
  width: 234px;
  height: 234px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border: 4px solid white;
`;

const DogImage = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  object-fit: cover;
`;

const DogName = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-top: 12px;
  color: #514f6e;
  text-align: center;
`;
