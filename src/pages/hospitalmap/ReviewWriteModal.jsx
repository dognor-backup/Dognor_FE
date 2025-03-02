import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@/shared/components/modals/Modal";
import useModalStore from "@/shared/hooks/useModalStore";
import { Button } from "@/shared/components/buttons/Button";
import VerifiedIcon from "@/assets/icons/subicon/verified_mint.svg?react";
import EmptyStar from "@/assets/icons/primary/star_primary.svg?react";
import FilledStar from "@/assets/icons/primary/star_filled_primary.svg?react";
import AddProfileBtnImg from "@/assets/icons/default/image.svg?react";

export default function ReviewWriteModal({ hospital }) {
  const { isModalOpen, closeModal } = useModalStore();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - selectedImages.length);
    const newImageUrls = newImages.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...newImageUrls]);
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return starValue <= rating ? (
        <FilledStar 
          key={index} 
          width={32} 
          height={32} 
          onClick={() => handleStarClick(starValue)} 
        />
      ) : (
        <EmptyStar 
          key={index} 
          width={32} 
          height={32} 
          onClick={() => handleStarClick(starValue)} 
        />
      );
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // 리뷰 제출 로직 추가 예정
    closeModal();
  };

  if (!hospital) return null;

  return (
    <Modal
      size="medium"
      title="리뷰 작성"
      BtnText="등록하기"
      isModalOpen={isModalOpen}
      modalname="writeReview"
      formName="writeReview"
      onSubmit={handleReviewSubmit}
    >
      <ModalContentLayout>
        <HospitalInfoSection>
          <HospitalNameRow>
            <VerifiedWrapper>
              <VerifiedIcon width={16} height={16} />
            </VerifiedWrapper>
            <HospitalName>{hospital.hospitalName}</HospitalName>
            {hospital.donationYn === 1 && (
              <DonationBadge>헌혈 가능</DonationBadge>
            )}
          </HospitalNameRow>
          <HospitalAddress>
            {hospital.address} {hospital.addressDetail}
          </HospitalAddress>
        </HospitalInfoSection>

        <RatingSection>
          <RatingText>{rating.toFixed(1)}</RatingText>
          <StarContainer>
            {renderStars()}
          </StarContainer>
        </RatingSection>

        <ImageUploadSection>
          <ImageUploadText>이미지 첨부</ImageUploadText>
          <ImageUploadCount>{selectedImages.length}/4</ImageUploadCount>
          <ImageUploadButton 
            type="button" 
            onClick={() => document.getElementById('imageUpload').click()}
            disabled={selectedImages.length >= 4}
          >
            <AddProfileBtnImg />
          </ImageUploadButton>
          <HiddenFileInput 
            type="file" 
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          {selectedImages.length > 0 && (
            <ImagePreviewContainer>
              {selectedImages.map((imageUrl, index) => (
                <ImagePreview key={index}>
                  <PreviewImage src={imageUrl} alt={`Preview ${index + 1}`} />
                  <RemoveImageButton onClick={() => removeImage(index)}>
                    ✕
                  </RemoveImageButton>
                </ImagePreview>
              ))}
            </ImagePreviewContainer>
          )}
        </ImageUploadSection>

        <ReviewTextarea 
          placeholder="댓글을 작성해주세요"
          value={reviewText}
          onChange={(e) => {
            if (e.target.value.length <= 400) {
              setReviewText(e.target.value);
            }
          }}
          maxLength={400}
        />
      </ModalContentLayout>
    </Modal>
  );
}

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HospitalInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals_05};
`;

const HospitalNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VerifiedWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HospitalName = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const DonationBadge = styled.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 4px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary_blue};
  color: white;
`;

const HospitalAddress = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_02};
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const RatingText = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary_purple};
`;

const StarContainer = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const ImageUploadSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const ImageUploadText = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_02};
`;

const ImageUploadCount = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_03};
`;

const ImageUploadButton = styled.button`
  background: transparent;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 94px;
  height: 94px;
`;

const PreviewImage = styled.img`
  width: 94px;
  height: 94px;
  object-fit: cover;
  border-radius: 4px;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  border-radius: 4px;
  resize: none;
  font-size: 14px;
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutrals_03};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary_blue};
  }
`;