import styled from "@emotion/styled";
import AddProfileBtnImg from "../../../assets/icons/default/image.svg?react";
import { Input } from "@/components/ui/input";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import { Button } from "@/shared/components/buttons/Button";
import { InputForm } from "@/shared/components/input/InputForm";

export default function EditPatInfoModalContent() {
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  return (
    <ModalContentLayout>
      <HeaderText>반려견 정보</HeaderText>
      <AddDogPhotoButton type="file">
        <AddProfileBtnImg />
      </AddDogPhotoButton>
      <InputWrapper>
        <InputText>반려견 프로필 [필수]</InputText>
        <InputContainer>
          <Input type="file" placeholder="사진을 등록해주세요" />
          <ButtonWrapper>
            <Button variant="normal" size="medium">
              파일 첨부하기
            </Button>
          </ButtonWrapper>
        </InputContainer>
        <InputDescriptionText>파일은 1MB 이내로 해주세요</InputDescriptionText>
      </InputWrapper>
      <InputWrapper>
        <InputForm
          id="dogName"
          name="dogName"
          placeholder="반려견 이름을 입력해주세요"
          label="반려견 이름 [필수]"
          getInputValue={getInputValue}
        />
      </InputWrapper>
      <Input type="calender" />
    </ModalContentLayout>
  );
}

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderText = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const AddDogPhotoButton = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  background: transparent;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const InputDescriptionText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_03};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  width: 152px;
`;
