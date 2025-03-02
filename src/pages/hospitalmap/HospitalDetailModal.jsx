import React from "react";
import styled from "@emotion/styled";
import Modal from "@/shared/components/modals/Modal";
import useModalStore from "@/shared/hooks/useModalStore";
import { Button } from "@/shared/components/buttons/Button";
import VerifiedIcon from "@/assets/icons/subicon/verified_mint.svg?react";
import EmptyStar from "@/assets/icons/primary/star_primary.svg?react";
import FilledStar from "@/assets/icons/primary/star_filled_primary.svg?react";
import PaceMaker from "../../assets/icons/subicon/pacemaker.svg?react";

export default function HospitalDetailModal({ hospital }) {
  const { isModalOpen } = useModalStore();

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

  if (!hospital) return null;

  return (
    <Modal
      size="medium"
      title=""
      BtnText=""
      isModalOpen={isModalOpen}
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
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 4px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary_blue};
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
