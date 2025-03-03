import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@/shared/components/modals/Modal";
import useModalStore from "@/shared/hooks/useModalStore";
import ArrowLeft from "../../assets/icons/gray/chevron_left_g.svg?react";
import ArrowRight from "../../assets/icons/gray/chevron_right_g.svg?react";

export default function ReviewDetailModal({ review }) {
  const { closeModal } = useModalStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!review) return null;

  const reviewImages = review.reviewImgList
    ? review.reviewImgList.split(",").map((img) => img.trim())
    : [];

  const totalImages = reviewImages.length;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const handleRadioClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBackButton = () => {
    closeModal();
  };

  return (
    <Modal
      size="medium"
      title=""
      BtnText=""
      modalname="reviewDetail"
      formName=""
    >
      <BackButton onClick={handleBackButton}>
        <ArrowLeft width={24} height={24} />
      </BackButton>

      <ModalContentLayout>
        {totalImages > 0 ? (
          <ImageSection>
            <ImageContainer>
              {totalImages > 0 && (
                <ReviewImage
                  src={reviewImages[currentImageIndex]}
                  alt={`리뷰 이미지 ${currentImageIndex + 1}`}
                />
              )}

              {totalImages > 1 && (
                <>
                  <NavButton position="left" onClick={handlePrevImage}>
                    <ArrowLeft width={24} height={24} />
                  </NavButton>
                  <NavButton position="right" onClick={handleNextImage}>
                    <ArrowRight width={24} height={24} />
                  </NavButton>
                </>
              )}
            </ImageContainer>

            {totalImages > 1 && (
              <RadioContainer>
                {reviewImages.map((_, index) => (
                  <RadioButton
                    key={index}
                    active={index === currentImageIndex}
                    onClick={() => handleRadioClick(index)}
                  />
                ))}
              </RadioContainer>
            )}
          </ImageSection>
        ) : null}

        <ReviewContent>
          <ProfileSection>
            <ProfileImage src={review.userProfileImgUrl} alt="프로필 이미지" />
            <ProfileName>{review.name}</ProfileName>
          </ProfileSection>

          <ReviewText>{review.review}</ReviewText>
        </ReviewContent>
      </ModalContentLayout>
    </Modal>
  );
}

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 0;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ReviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: 16px;" : "right: 16px;")}
  transform: translateY(-50%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`;

const RadioContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const RadioButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary_blue : theme.colors.neutrals_05};
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const ReviewText = styled.div`
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_01};
  white-space: pre-wrap;
  word-break: break-word;
`;
