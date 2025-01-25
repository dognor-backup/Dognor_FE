import { IconBtn } from "@/shared/components/buttons/IconBtn";
import styled from "@emotion/styled";
import WhitePlus from "../../../assets/icons/white/plus_w.svg?react";
import BlackPlus from "../../../assets/icons/black/plus.svg?react";
import useModalStore from "@/shared/hooks/useModalStore";
import Modal from "@/shared/components/modals/Modal";
import AddProfileBtnImg from "../../../assets/icons/default/image.svg?react";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import { InputForm } from "@/shared/components/input/InputForm";
import { InputFile } from "@/shared/components/input/InputFile";
import { DatePicker } from "@/shared/components/DatePicker";
import { SelectBox } from "@/shared/components/SelectBox";

export default function PatInfoCard() {
  const { isModalOpen, openModal } = useModalStore();
  const { inputValues, getInputValue } = useGetValueFromTextInput();

  const dogSizeList = ["소형견", "중형견", "대형견"];
  const bloodTypeList = ["DEA 1.1-", "DEA 1.1+", "DEA 1.2-", "DEA 1.2+","DEA 2-", "DEA 2+", "DEA 3-", "DEA 3+","DEA 4-", "DEA 4+","DEA 5-", "DEA 5+", "DEA 6-", "DEA 6+", "DEA 7-", "DEA 7+", "DEA 8-", "DEA 8+","DEA 9-", "DEA 9+", "DEA 10-", "DEA 10+", "DEA 11-", "DEA 11+", "DEA 12-", "DEA 12+", "DEA 13-", "DEA 13+", "기타/모름"]


  const handleFileChange = (file) => {
    console.log("선택된 파일:", file);
  };
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
        <AddDogBtn onClick={() => openModal("addDogInfo")}>
          <BlackPlus />
          강아지 정보를 추가해주세요:)
        </AddDogBtn>
        <Modal
          title="반려견 정보입력"
          BtnText="추가하기"
          size=""
          isModalOpen={isModalOpen}
          modalName="addDogInfo"
        >
          <ModalContentLayout>
            <AddDogPhotoButton type="file">
              <AddProfileBtnImg />
            </AddDogPhotoButton>
            <InputContainer>
              <InputFile
                labelText="반려견 프로필 [필수]"
                placeholder="사진을 등록해주세요"
                buttonText="파일 첨부하기"
                infoMessage="파일은 1MB 이내로 해주세요"
                onFileChange={handleFileChange}
              />
            </InputContainer>
            <InputContainer>
              <InputForm
                id="dogName"
                name="dogName"
                placeholder="반려견 이름을 입력해주세요"
                label="반려견 이름 [필수]"
                getInputValue={getInputValue}
              />
            </InputContainer>
            <InputFlexContainer>
              <HalfWidthInput>
                <DatePicker label="생일" />
              </HalfWidthInput>
              <HalfWidthInput>
                <InputForm
                  id="weight"
                  name="weight"
                  placeholder="숫자만 작성해주세요"
                  label="몸무게(Kg)"
                  status="normal"
                  getInputValue={getInputValue}
                />
              </HalfWidthInput>
            </InputFlexContainer>
            <InputFlexContainer>
              <HalfWidthInput>
                <SelectBox label="구분" optionList={dogSizeList} />
              </HalfWidthInput>
              <HalfWidthInput>
                <SelectBox label="혈액형" optionList={bloodTypeList} />
              </HalfWidthInput>
            </InputFlexContainer>
          </ModalContentLayout>
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

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AddDogPhotoButton = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  background: transparent;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const HalfWidthInput = styled.div`
  flex: 1;
  min-width: 0;
`;
