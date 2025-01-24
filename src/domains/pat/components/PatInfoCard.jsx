import { IconBtn } from "@/shared/components/buttons/IconBtn";
import styled from "@emotion/styled";
import WhitePlus from "../../../assets/icons/white/plus_w.svg?react";
import BlackPlus from "../../../assets/icons/black/plus.svg?react";
import useModalStore from "@/shared/hooks/useModalStore";
import Modal from "@/shared/components/modals/Modal";
import EditPatInfoModalContent from "./EditPatInfoModalContent";

export default function PatInfoCard() {
  const { isModalOpen, openModal } = useModalStore();
  return (
    <CardLayout>
      <TextContainer>
        <HeaderText>반려견 정보</HeaderText>
        <SubText>아직 함께 하는 반려견이 없습니다</SubText>
      </TextContainer>
      <ContentBox>
        <ButtonContainer>
          <IconBtn>
            <WhitePlus />
          </IconBtn>
        </ButtonContainer>
        <AddDogBtn onClick={()=>openModal("addDogInfo")}>
          <BlackPlus />
          강아지 정보를 추가해주세요:)
        </AddDogBtn>
        <Modal
          title={<>회원 확인을 위해 비밀번호를 입력해주세요.</>}
          BtnText="추가하기"
          size=""
          isModalOpen={isModalOpen}
          modalName="addDogInfo"
        >
          <EditPatInfoModalContent />
        </Modal>
      </ContentBox>
    </CardLayout>
  );
}

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HeaderText = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 42p;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const SubText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const ContentBox = styled.div`
  position: relative;
  display: flex;
  width: 1008px;
  height: 328px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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
