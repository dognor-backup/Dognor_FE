import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@/shared/components/modals/Modal";
import useModalStore from "@/shared/hooks/useModalStore";
import { Button } from "@/shared/components/buttons/Button";
import VerifiedIcon from "@/assets/icons/subicon/verified_mint.svg?react";
import EmptyStar from "@/assets/icons/primary/star_primary.svg?react";
import FilledStar from "@/assets/icons/primary/star_filled_primary.svg?react";
import AddProfileBtnImg from "@/assets/icons/default/image.svg?react";
import ArrowLeft from "../../assets/icons/primary/arrow_left_primary.svg?react";
import { submitHospitalReview } from "@/domains/map/api/fetchHospitalReviews";

export default function ReviewWriteModal({ hospital }) {
  const { closeModal } = useModalStore();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - selectedImages.length);
    
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, {
          file: file,
          preview: URL.createObjectURL(file),
          data: e.target.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return starValue <= rating ? (
        <FilledStar
          key={index}
          width={24}
          height={24}
          onClick={() => handleStarClick(starValue)}
        />
      ) : (
        <EmptyStar
          key={index}
          width={24}
          height={24}
          onClick={() => handleStarClick(starValue)}
        />
      );
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      setError("리뷰 내용을 입력해주세요.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const requestData = {
        hospitalSeq: hospital.hospitalInfoSeq,
        review: reviewText,
        starRating: rating
      };
      
      if (selectedImages.length > 0) {
        const reviweImgFile = selectedImages.map(img => img.data).join(',');
        requestData.reviewImgs = { reviweImgFile };
      }
      
      const result = await submitHospitalReview(requestData);
      
      if (result.success) {
        closeModal();
      } else {
        setError(result.msg);
      }
    } catch (error) {
      setError("리뷰 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackButton = () => {
    closeModal();
  };

  if (!hospital) return null;

  return (
    <Modal
      size="medium"
      title=""
      BtnText={isLoading ? "등록 중..." : "등록하기"}
      modalname="hospitalReviewWrite"
      formName="writeReview"
      onSubmit={handleReviewSubmit}
    >
      <BackButton onClick={handleBackButton}>
        <ArrowLeft width={24} height={24} />
      </BackButton>

      <ModalContentLayout>
        <HospitalInfoSection>
          <HospitalNameRow>
            <VerifiedWrapper>
              <VerifiedIcon width={20} height={20} />
            </VerifiedWrapper>
            <HospitalName>{hospital.hospitalName}</HospitalName>
            {hospital.donationYn === 1 && (
              <DonationBadge>헌혈 가능</DonationBadge>
            )}
          </HospitalNameRow>
          <AddressContainer>
            {hospital.address && (
              <HospitalAddress>{hospital.address}</HospitalAddress>
            )}
            {hospital.addressDetail && (
              <HospitalAddress>{hospital.addressDetail}</HospitalAddress>
            )}
          </AddressContainer>
        </HospitalInfoSection>

        <RatingSection>
          <RatingText>{rating.toFixed(1)}</RatingText>
          <StarContainer>{renderStars()}</StarContainer>
        </RatingSection>

        <ImageUploadSectionWrapper>
          <ImageUploadLabelContainer>
            <ImageUploadText>이미지 첨부</ImageUploadText>
            <ImageUploadCount>{selectedImages.length}/4</ImageUploadCount>
          </ImageUploadLabelContainer>
          
          {selectedImages.length === 0 ? (
            <CenteredUploadButtonContainer>
              <ImageUploadButton
                type="button"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                <AddProfileBtnImg />
              </ImageUploadButton>
            </CenteredUploadButtonContainer>
          ) : (
            <ImageGalleryContainer>
              {selectedImages.map((image, index) => (
                <ImagePreview key={index}>
                  <PreviewImage src={image.preview} alt={`Preview ${index + 1}`} />
                  <RemoveImageButton onClick={() => removeImage(index)}>
                    ✕
                  </RemoveImageButton>
                </ImagePreview>
              ))}
              
              {selectedImages.length < 4 && (
                <ImageUploadButton
                  type="button"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  <AddProfileBtnImg />
                </ImageUploadButton>
              )}
            </ImageGalleryContainer>
          )}
          
          <HiddenFileInput
            type="file"
            id="imageUpload"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </ImageUploadSectionWrapper>
        
        <ReviewTextareaContainer>
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
          <TextCounter>{reviewText.length}/400</TextCounter>
        </ReviewTextareaContainer>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
  gap: 16px;
  margin-top: 16px;
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

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary_purple};
`;

const StarContainer = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const ImageUploadSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ImageUploadLabelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`;

const ImageUploadText = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const ImageUploadCount = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const CenteredUploadButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
`;

const ImageGalleryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: nowrap;
  margin-bottom: 16px;
`;

const ImageUploadButton = styled.button`
  width: 90px;
  height: 90px;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
`;

const PreviewImage = styled.img`
  width: 90px;
  height: 90px;
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

const ReviewTextareaContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  height: 316px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  border-radius: 6px;
  resize: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_02};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutrals_03};
  }
`;

const TextCounter = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutrals_02};
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`;