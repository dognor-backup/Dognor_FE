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
import { useUpdatePatInfo } from "../hooks/useUpdatePatInfo";
import useUserStore from "@/domains/auth/store/useUserStore";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function EditPatInfoCard({ petData }) {
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

  const { isModalOpen, closeModal } = useModalStore();
  const { inputValues, getInputValue, setInputValues } =
    useGetValueFromTextInput();
  const mutation = useUpdatePatInfo();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (petData) {
      // 각 필드를 개별적으로 설정
      getInputValue({ name: "patSeq", value: petData.patSeq });
      getInputValue({ name: "name", value: petData.name });
      getInputValue({ name: "birthday", value: petData.birthday });
      getInputValue({ name: "weight", value: petData.weight });
      getInputValue({ name: "breedCd", value: petData.breedCd });
      getInputValue({ name: "bloodTypeCd", value: petData.bloodTypeCd });
      getInputValue({ name: "isDonor", value: petData.isDonor.toString() });
    }
  }, [petData, getInputValue]);

  const handleFileChange = (file) => {
    getInputValue({ name: "imgFile", value: file });
  };

  const getSelectedDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    getInputValue({ name: "birthday", value: formattedDate });
  };

  const handleSavePatInfo = (e) => {
    e.preventDefault();

    const userSeqValue = user?.userData?.userSeq;

    if (!userSeqValue) {
      alert("사용자 정보를 확인할 수 없습니다.");
      return;
    }

    if (!inputValues.patSeq) {
      alert("반려견 정보가 올바르지 않습니다.");
      return;
    }

    const updatedInputValues = {
      ...inputValues,
      userSeq: userSeqValue,
    };

    const requiredFields = [
      "name",
      "birthday",
      "breedCd",
      "bloodTypeCd",
      "isDonor",
      "patSeq",
      "userSeq",
    ];
    const missingFields = requiredFields.filter(
      (field) => !updatedInputValues[field]
    );

    if (missingFields.length > 0) {
      alert(`다음 필드를 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    mutation.mutate(updatedInputValues, {
      onSuccess: (response) => {
        if (response.success) {
          queryClient.invalidateQueries(["patInfo"]);
          closeModal();
        } else {
          alert(response.msg || "반려견 정보 수정에 실패했습니다.");
        }
      },
      onError: () => {
        alert("반려견 정보 수정 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <Modal
      title="반려견 정보 수정"
      BtnText="저장하기"
      isModalOpen={isModalOpen}
      modalname="editDogInfo"
      formName="editDogInfo"
      onSubmit={handleSavePatInfo}
    >
      <ModalContentLayout>
        <AddDogPhotoButton type="file">
          <AddProfileBtnImg />
        </AddDogPhotoButton>
        <InputContainer>
          <InputFile
            labelText="반려견 프로필"
            placeholder="사진을 등록해주세요"
            buttonText="파일 첨부하기"
            infoMessage="파일은 1MB 이내로 해주세요 (선택사항)"
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
            <DatePicker
              label="생일"
              getSelectedDate={getSelectedDate}
              defaultDate={
                inputValues.birthday
                  ? new Date(inputValues.birthday)
                  : undefined
              }
            />
          </HalfWidthInput>
          <HalfWidthInput>
            <InputForm
              id="weight"
              name="weight"
              placeholder="숫자만 작성해주세요"
              label="몸무게(Kg)"
              value={inputValues.weight || ""}
              getInputValue={getInputValue}
            />
          </HalfWidthInput>
        </InputFlexContainer>
        <InputFlexContainer>
          <HalfWidthInput>
            <SelectBox
              label="구분"
              optionList={dogSizeList}
              placeholder="구분항목을 선택해주세요"
              defaultValue={inputValues.breedCd}
              getValueFromSelect={(value) =>
                getInputValue({ name: "breedCd", value })
              }
            />
          </HalfWidthInput>
          <HalfWidthInput>
            <SelectBox
              label="혈액형"
              optionList={bloodTypeList}
              placeholder="혈액형을 선택해주세요"
              defaultValue={inputValues.bloodTypeCd}
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
