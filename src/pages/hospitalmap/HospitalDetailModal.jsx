import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Modal from "@/shared/components/modals/Modal";
import useModalStore from "@/shared/hooks/useModalStore";
import { Button } from "@/shared/components/buttons/Button";
import VerifiedIcon from "@/assets/icons/subicon/verified_mint.svg?react";
import EmptyStar from "@/assets/icons/primary/star_primary.svg?react";
import FilledStar from "@/assets/icons/primary/star_filled_primary.svg?react";
import PaceMaker from "../../assets/icons/subicon/pacemaker.svg?react";
import VerticalDotsSelect from "@/shared/components/VerticalDotsSelect";
import { fetchHospitalReviews } from "@/domains/map/api/fetchHospitalReviews";

export default function HospitalDetailModal({ hospital }) {
  const { isModalOpen, openModal } = useModalStore();
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewImages, setReviewImages] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      if (hospital?.hospitalInfoSeq) {
        const result = await fetchHospitalReviews(hospital.hospitalInfoSeq);
        if (result.success) {
          setReviews(result.data);
          setReviewCount(result.data.length);

          const allReviewImages = result.data
            .filter((review) => review.reviewImgList)
            .flatMap((review) =>
              review.reviewImgList.split(",").map((img) => img.trim())
            );

          setReviewImages(allReviewImages);
        }
      }
    };

    loadReviews();
  }, [hospital]);

  const renderStarRating = (rating) => {
    const filledStars = Math.round(rating);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<FilledStar key={i} width={16} height={16} />);
      } else {
        stars.push(<EmptyStar key={i} width={16} height={16} />);
      }
    }

    return stars;
  };

  const openKakaoMap = () => {
    const kakaoMapUrl = `https://map.kakao.com/link/map/${hospital.hospitalName},${hospital.y},${hospital.x}`;
    window.open(kakaoMapUrl, "_blank");
  };

  const bloodTypeData = [
    { type: "DEA 1.1", count: hospital.bloodTypeCnts?.["DEA 1.1"] || 0 },
    { type: "DEA 1.2", count: hospital.bloodTypeCnts?.["DEA 1.2"] || 0 },
    { type: "DEA 3", count: hospital.bloodTypeCnts?.["DEA 3"] || 0 },
    { type: "DEA 4", count: hospital.bloodTypeCnts?.["DEA 4"] || 0 },
    { type: "DEA 5", count: hospital.bloodTypeCnts?.["DEA 5"] || 0 },
    { type: "DEA 6", count: hospital.bloodTypeCnts?.["DEA 6"] || 0 },
    { type: "DEA 7", count: hospital.bloodTypeCnts?.["DEA 7"] || 0 },
    { type: "DEA 8", count: hospital.bloodTypeCnts?.["DEA 8"] || 0 },
    { type: "기타", count: hospital.bloodTypeCnts?.["기타"] || 0 },
  ];

  const totalBloodPacks = Object.values(hospital.bloodTypeCnts || {}).reduce(
    (a, b) => a + b,
    0
  );

  const truncateText = (text) => {
    const maxLines = 5;
    const lines = text.split("\n");

    if (lines.length > maxLines) {
      return {
        truncatedText: lines.slice(0, maxLines).join("\n"),
        hasMore: true,
      };
    }

    return {
      truncatedText: text,
      hasMore: false,
    };
  };

  const handleWriteReview = () => {
    openModal("hospitalReviewWrite");
  };

  if (!hospital) return null;

  return (
    <Modal
      size="medium"
      title=""
      BtnText=""
      modalname="hospitalDetail"
      formName=""
      onSubmit={(e) => e.preventDefault()}
    >
      <ModalContentLayout>
        <ImageContainer>
          <StoryImage
            src={hospital.mainImgUrl}
            alt={`${hospital.hospitalName} 이미지`}
          />
        </ImageContainer>

        <ContentContainer>
          <HospitalNameRow>
            <VerifiedWrapper>
              <VerifiedIcon width={16} height={16} />
            </VerifiedWrapper>
            <HospitalName>{hospital.hospitalName}</HospitalName>
            {hospital.donationYn === 1 && (
              <DonationBadge>헌혈 가능</DonationBadge>
            )}
          </HospitalNameRow>

          <RatingContainer>
            <RatingNumber>{hospital.starRating.toFixed(1)}</RatingNumber>
            {renderStarRating(hospital.starRating)}
          </RatingContainer>

          <InfoSectionContainer>
            {hospital.address && (
              <InfoSection>
                <InfoText>{hospital.address}</InfoText>
              </InfoSection>
            )}
            {hospital.addressDetail && (
              <InfoSection>
                <InfoText>{hospital.addressDetail}</InfoText>
              </InfoSection>
            )}
            <ContactSection>
              {hospital.phone && (
                <InfoSection>
                  <InfoText>{hospital.phone}</InfoText>
                </InfoSection>
              )}
              <FindWayButton>
                <Button
                  variant="normal"
                  size="small"
                  state="default"
                  onClick={openKakaoMap}
                >
                  찾아가기
                </Button>
              </FindWayButton>
            </ContactSection>
            {hospital.openingTime && (
              <InfoSection>
                <InfoText>{hospital.openingTime}</InfoText>
              </InfoSection>
            )}
          </InfoSectionContainer>

          <BloodStatusContainer>
            <BloodStatusTitle>
              <PaceMaker width={21} height={20} />
              혈액보유 현황 : {totalBloodPacks}
            </BloodStatusTitle>
            <BloodGridContainer>
              {bloodTypeData.map((item, index) => (
                <BloodStatusBox key={index}>
                  <BloodTypeText>{item.type}</BloodTypeText>|
                  <BloodCountText>{item.count}</BloodCountText>
                </BloodStatusBox>
              ))}
            </BloodGridContainer>
          </BloodStatusContainer>

          <ReviewSection>
            <Button
              variant="primary"
              size="small"
              state="default"
              onClick={handleWriteReview}
            >
              리뷰쓰기
            </Button>
            <ReviewHeader>
              <ReviewText>리뷰</ReviewText>
              <ReviewCount>{reviewCount}</ReviewCount>
            </ReviewHeader>
          </ReviewSection>

          <PhotoSection>
            <PhotoHeader>
              <PhotoText>사진</PhotoText>
              <PhotoCount>{reviewImages.length}</PhotoCount>
            </PhotoHeader>
            {reviewImages.length > 0 && (
              <PhotoImagesContainer>
                {reviewImages.map((imgUrl, index) => (
                  <PhotoImage
                    key={index}
                    src={imgUrl}
                    alt={`리뷰 이미지 ${index + 1}`}
                  />
                ))}
              </PhotoImagesContainer>
            )}
          </PhotoSection>

          {reviews.map((review, index) => {
            const { truncatedText, hasMore } = truncateText(review.review);

            return (
              <ReviewItemContainer key={index}>
                <ReviewItemHeader>
                  <ProfileSection>
                    <ProfileImage
                      src={review.userProfileImgUrl}
                      alt="프로필 이미지"
                    />
                    <ProfileName>{review.name}</ProfileName>
                  </ProfileSection>
                  <VerticalDotsSelectWrapper>
                    <VerticalDotsSelect
                      handleEdit={() => {}}
                      handleDelete={() => {}}
                    />
                  </VerticalDotsSelectWrapper>
                </ReviewItemHeader>

                {review.reviewImgList && (
                  <ReviewImagesContainer>
                    {review.reviewImgList
                      .split(",")
                      .slice(0, 4)
                      .map((imgUrl, imgIndex) => (
                        <ReviewImage
                          key={imgIndex}
                          src={imgUrl.trim()}
                          alt={`리뷰 이미지 ${imgIndex + 1}`}
                        />
                      ))}
                  </ReviewImagesContainer>
                )}

                <ReviewTextContainer>
                  <ReviewDetailText>{truncatedText}</ReviewDetailText>
                  {hasMore && <MoreText>더보기</MoreText>}
                </ReviewTextContainer>
              </ReviewItemContainer>
            );
          })}
        </ContentContainer>
      </ModalContentLayout>
    </Modal>
  );
}

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 10px;
`;

const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 0;
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
  font-size: 14px;
  margin-left: 4px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary_blue};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

const RatingNumber = styled.span`
  color: ${({ theme }) => theme.colors.primary_purple};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
`;

const InfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals_05};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const FindWayButton = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const InfoText = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const BloodStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals_05};
`;

const BloodStatusTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary_blue};
`;

const BloodGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 384px;
`;

const BloodStatusBox = styled.div`
  width: 120px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_04};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.neutrals_04};
`;

const BloodTypeText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const BloodCountText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding-top: 16px;
`;

const ReviewText = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const ReviewCount = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PhotoText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_02};
`;

const PhotoCount = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_02};
`;

const PhotoImagesContainer = styled.div`
  display: flex;
  gap: 8px;
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals_05};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PhotoImage = styled.img`
  width: 94px;
  height: 94px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  display: inline-block;
`;

const ReviewImagesContainer = styled.div`
  display: flex;
  gap: 8px;
  white-space: nowrap;
  overflow-x: hidden;
`;

const ReviewImage = styled.img`
  width: 94px;
  height: 94px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`;

const ReviewItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals_05};
`;

const ReviewItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const VerticalDotsSelectWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReviewDetailText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_02};
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreText = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_03};
  cursor: pointer;
`;