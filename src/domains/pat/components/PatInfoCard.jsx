import styled from "@emotion/styled";
import Spinner from "@/shared/components/Spinner";
import { useGetPatInfo } from "../hooks/useGetPatInfo";
import AddPatInfoCard from "./AddPatInfoCard";
import useUserStore from "@/domains/auth/store/useUserStore";
import { calculateAge } from "@/shared/utils/calculateAge";
import { IconBtn } from "@/shared/components/buttons/IconBtn";
import PlusIcon from "../../../assets/icons/white/plus_w.svg?react";
import BlackPlus from "../../../assets/icons/black/plus.svg?react";
import useModalStore from "@/shared/hooks/useModalStore";

export default function PatInfoCard() {
  const { isModalOpen, openModal } = useModalStore();
  let page = 1;
  const size = 4;
  const { user } = useUserStore();
  const userSeq = user?.userData?.userSeq;

  const { data, isLoading, error } = useGetPatInfo(userSeq, page, size);

  if (isLoading) return <Spinner />;
  if (error) return <div>에러</div>;

  console.log(data?.data.data);

  return (
    <PatInfoLayout>
      <PatInfoHeaderTextContainer>
        <PatInfoHeaderTitleText>반려견 정보</PatInfoHeaderTitleText>
        <PatInfoHeaderSubText>
          {data?.data?.data.length >= 1
            ? `${data.data.data.length}마리의 반려견과 함께하고 있습니다`
            : "아직 함께 하는 반려견이 없습니다"}
        </PatInfoHeaderSubText>
      </PatInfoHeaderTextContainer>
      <PatInfoContentLayout>
        <IconBtnContainer>
          <IconBtn onClick={() => openModal("addDogInfo")}>
            <PlusIcon />
          </IconBtn>
        </IconBtnContainer>
        <AddPatInfoCard />
        {data?.data?.data.length >= 1 ? (
          <PatInfoCardLayout>
            {data.data.data.map((pat, index) => (
              <PatInfoCardWrapper key={index}>
                <PatProfileImg src={pat.imgUrl} />
                <PatInfoWrapper>
                  <PatNameText>{pat.name}</PatNameText>
                  <PatInfoContainer>
                    <PatInfoText>
                      나이: {calculateAge(pat.birthday)}
                    </PatInfoText>
                    <PatInfoText>분류: {pat.breedName}</PatInfoText>
                    <PatInfoText>몸무게: {pat.weight} Kg</PatInfoText>
                    <PatInfoText>혈액형: {pat.bloodTypeName}</PatInfoText>
                    {pat.isDonor === 1 ? (
                      <PatInfoHighlightedText>헌혈 가능</PatInfoHighlightedText>
                    ) : (
                      <PatInfoBoldText>헌혈 불가능</PatInfoBoldText>
                    )}
                  </PatInfoContainer>
                </PatInfoWrapper>
              </PatInfoCardWrapper>
            ))}
          </PatInfoCardLayout>
        ) : (
          <>
            <AddDogBtn onClick={() => openModal("addDogInfo")}>
              <BlackPlus />
              강아지 정보를 추가해주세요:)
            </AddDogBtn>
          </>
        )}
      </PatInfoContentLayout>
    </PatInfoLayout>
  );
}
const PatInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1008px;
  height: 637px;
  align-items: center;
  gap: 38px;
`;

const PatInfoHeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const PatInfoHeaderTitleText = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 42px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoHeaderSubText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoCardLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 21px;
  justify-content: center;
  align-items: center;
`;

const PatInfoCardWrapper = styled.div`
  display: flex;
  width: 360px;
  height: 180px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.25);
`;

const PatProfileImg = styled.img`
  width: 122px;
  height: 148px;
  border-radius: 6px;
`;

const PatInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PatNameText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PatInfoText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const PatInfoHighlightedText = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary_blue};
`;

const PatInfoBoldText = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const IconBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 16px;
`;

const AddDogBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 192px;
  border-radius: 16px;
  padding: 16px;
  gap: 16px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.neutrals_08};
`;

const PatInfoContentLayout = styled.div`
  width: 1008px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
