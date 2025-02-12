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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSavePatInfo } from "../hooks/useSavePatInfo";
import useUserStore from "@/domains/auth/store/useUserStore";

export default function AddPatInfoCard() {
  const { isModalOpen, openModal } = useModalStore();
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const mutation = useSavePatInfo();
  const { user } = useUserStore();

  const dogSizeList = ["소형견", "중형견", "대형견"];
  const bloodTypeList = [
    "DEA 1.1-",
    "DEA 1.1+",
    "DEA 1.2-",
    "DEA 1.2+",
    "DEA 2-",
    "DEA 2+",
    "DEA 3-",
    "DEA 3+",
    "DEA 4-",
    "DEA 4+",
    "DEA 5-",
    "DEA 5+",
    "DEA 6-",
    "DEA 6+",
    "DEA 7-",
    "DEA 7+",
    "DEA 8-",
    "DEA 8+",
    "DEA 9-",
    "DEA 9+",
    "DEA 10-",
    "DEA 10+",
    "DEA 11-",
    "DEA 11+",
    "DEA 12-",
    "DEA 12+",
    "DEA 13-",
    "DEA 13+",
    "기타/모름",
  ];

  const handleFileChange = (file) => {
    console.log("ddd", file);
    getInputValue({ name: "imgFile", value: file });
  };

  const getSelectedDate = (date) => {
    const dateForm = date.toISOString();
    const trimDate = dateForm.split("T")[0];
    getInputValue({ name: "birthday", value: trimDate });
  };

  const handleSavePatInfo = (e) => {
    e.preventDefault();
    getInputValue({ name: "userSeq", value: user.userData.userSeq });
    mutation.mutate(inputValues);
  };

  return (
    <Modal
      title="반려견 정보입력"
      BtnText="추가하기"
      size=""
      isModalOpen={isModalOpen}
      modalName="addDogInfo"
      formName="addDogInfo"
      onSubmit={handleSavePatInfo}
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
            id="name"
            name="name"
            placeholder="반려견 이름을 입력해주세요"
            label="반려견 이름 [필수]"
            getInputValue={getInputValue}
          />
        </InputContainer>
        <InputFlexContainer>
          <HalfWidthInput>
            <DatePicker label="생일" getSelectedDate={getSelectedDate} />
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
            <SelectBox
              label="구분"
              optionList={dogSizeList}
              getValueFromSelect={(value) =>
                getInputValue({ name: "breedCd", value })
              }
            />
          </HalfWidthInput>
          <HalfWidthInput>
            <SelectBox
              label="혈액형"
              optionList={bloodTypeList}
              getValueFromSelect={(value) =>
                getInputValue({ name: "bloodTypeCd", value })
              }
            />
          </HalfWidthInput>
        </InputFlexContainer>
        <DescriptionBox>
          <li style={{ listStyle: "inside" }}>
            소형견 성견 된 몸무게가 대략 10kg 미만(성견: 생후 2년 이상)
          </li>
          <li style={{ listStyle: "inside" }}>
            중형견 성견 된 몸무게가 대략 10~25kg 미만 ...
          </li>
          <li style={{ listStyle: "inside" }}>
            대형견 성견 된 몸무게가 대략 25kg이상
          </li>
        </DescriptionBox>
        <RadioGroupContainer>
          <RadioGroupText>헌혈 가능 여부</RadioGroupText>
          <RadioGroup
            className="flex gap-6"
            defaultValue="option-one"
            onValueChange={(value) => {
              getInputValue({ name: "isDonor", value });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="option-one" />
              <Label htmlFor="option-one">불가능</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="option-two" />
              <Label htmlFor="option-two">가능</Label>
            </div>
          </RadioGroup>
        </RadioGroupContainer>
      </ModalContentLayout>
    </Modal>
  );
}

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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

const DescriptionBox = styled.ul`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_02};
`;

const RadioGroupContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const RadioGroupText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;
