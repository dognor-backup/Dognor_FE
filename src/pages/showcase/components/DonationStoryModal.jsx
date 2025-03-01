import { useState, useEffect } from "react";
import useModalStore from "@/shared/hooks/useModalStore";
import Modal from "@/shared/components/modals/Modal";
import AddProfileBtnImg from "../../../assets/icons/default/image.svg?react";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import { InputFile } from "@/shared/components/input/InputFile";
import { SelectBox } from "@/shared/components/SelectBox";
import styled from "@emotion/styled";
import useUserStore from "@/domains/auth/store/useUserStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPatInfo } from "@/domains/pat/api/pat";
import { saveDonationStory } from "@/domains/donationstory/api/donationStory";

const CenteredModal = styled(Modal)`
  & > div:first-of-type {
    align-items: center !important;
    padding-top: 0 !important;
  }
`;

export default function DonationStoryModal() {
  const { isModalOpen, closeModal } = useModalStore();
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const { user } = useUserStore();
  const userSeq = user?.userData?.userSeq;
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState(null);

  const [pets, setPets] = useState([]);
  const [petNames, setPetNames] = useState([]);
  const [textLength, setTextLength] = useState(0);

  const { data: petListData } = useQuery({
    queryKey: ["patInfo", userSeq],
    queryFn: () => getPatInfo(userSeq, 1, 20),
    enabled: !!userSeq,
  });

  useEffect(() => {
    if (petListData?.success && petListData?.data) {
      setPets(petListData.data);
      const names = petListData.data.map((pet) => pet.name);
      setPetNames(names);
    }
  }, [petListData]);

  const mutation = useMutation({
    mutationFn: saveDonationStory,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries(["donationStories"]);
        closeModal();
        setPreviewImage(null);
      } else {
        alert(response.msg || "헌혈 이야기 등록에 실패했습니다.");
      }
    },
    onError: () => {
      alert("헌혈 이야기 등록 중 오류가 발생했습니다.");
    },
  });

  const handleFileChange = (file) => {
    getInputValue({ name: "imgFile", value: file });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handlePetSelect = (selectedValue) => {
    const index = parseInt(selectedValue) - 1;

    if (index >= 0 && index < pets.length) {
      const petSeq = pets[index].patSeq;
      getInputValue({ name: "patSeq", value: petSeq });
    }
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setTextLength(value.length);
    getInputValue({ name, value });
  };

  const handleSaveDonationStory = (e) => {
    e.preventDefault();

    if (!userSeq) {
      alert("사용자 정보를 확인할 수 없습니다.");
      return;
    }

    const updatedInputValues = {
      ...inputValues,
      userSeq: userSeq,
    };

    const requiredFields = ["patSeq", "content", "imgFile", "userSeq"];
    const missingFields = requiredFields.filter(
      (field) => !updatedInputValues[field]
    );

    if (missingFields.length > 0) {
      alert(`다음 필드를 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    if (!(updatedInputValues.imgFile instanceof File)) {
      alert("유효한 이미지를 등록해주세요.");
      return;
    }

    if (!updatedInputValues.content || updatedInputValues.content.length < 40) {
      alert("헌혈 후기는 최소 40자 이상 작성해주세요.");
      return;
    }

    mutation.mutate(updatedInputValues);
  };

  return (
    <CenteredModal
      title="후기 작성하기"
      BtnText="업로드하기"
      isModalOpen={isModalOpen}
      modalname="donationStory"
      formName="donationStoryForm"
      onSubmit={handleSaveDonationStory}
    >
      <ModalContentLayout>
        <IconContainer>
          {previewImage ? (
            <PreviewImg src={previewImage} alt="업로드할 이미지" />
          ) : (
            <AddProfileBtnImg />
          )}
        </IconContainer>

        <FlexContainer>
          <HalfColumn>
            <SelectWrapper>
              <SelectBox
                label="반려견 선택"
                optionList={petNames}
                placeholder="반려견을 선택해주세요"
                getValueFromSelect={handlePetSelect}
              />
              <SelectDescription>
                헌혈을 진행한 반려견을 선택해주세요
              </SelectDescription>
            </SelectWrapper>
          </HalfColumn>
          <HalfColumn>
            <InputFile
              labelText="이미지첨부"
              placeholder="파일을 첨부해주세요"
              buttonText="파일 첨부하기"
              infoMessage="강아지의 프로필 사진을 등록 해주세요"
              onFileChange={handleFileChange}
            />
          </HalfColumn>
        </FlexContainer>

        <TextareaContainer>
          <TextareaHeader>
            <TextareaLabel>후기</TextareaLabel>
            <TextareaCount>{textLength}/400</TextareaCount>
          </TextareaHeader>
          <StyledTextarea
            id="content"
            name="content"
            placeholder="헌혈 후기를 40자 이상 작성해주세요."
            onChange={handleTextareaChange}
            maxLength={400}
            rows={5}
          />
        </TextareaContainer>

        <DescriptionBox>
          <DescriptionText>
            *헌혈 후기와 관련된 이미지와 글을 작성해 주세요
          </DescriptionText>
          <DescriptionText>
            내용이 헌혈 후기와 무관할 시 삭제가 될 수 있음을 참고 부탁드립니다.
          </DescriptionText>
        </DescriptionBox>
      </ModalContentLayout>
    </CenteredModal>
  );
}

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PreviewImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const HalfColumn = styled.div`
  flex: 1;
  min-width: 0;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectDescription = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_02};
  margin-top: 6px;
`;

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextareaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const TextareaLabel = styled.label`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const TextareaCount = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_03};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  border-radius: 6px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.neutrals_01};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutrals_03};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary_blue};
  }
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
`;

const DescriptionText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_02};
`;