import styled from "@emotion/styled";
import DefaultProfileImg from "../../../assets/icons/default/profile_button.svg?react";
import { Button } from "@/shared/components/buttons/Button";
import { maskEmail, maskPhoneNumber } from "@/shared/utils/dataMasking";
import useModalStore from "@/shared/hooks/useModalStore";
import Modal from "@/shared/components/modals/Modal";
import { InputForm } from "@/shared/components/input/InputForm";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import { validateId, validatePassword } from "@/shared/utils/validation";
import { useState } from "react";
import { useCheckUser } from "../hooks/useCheckUser";

export default function UserInfoCard({ name, phone, email }) {
  const maskedPhone = maskPhoneNumber(phone);
  const maskedEmail = maskEmail(email);
  const [validationError, setValidationError] = useState("");
  const checkUserMutation = useCheckUser(setValidationError);

  const { isModalOpen, openModal } = useModalStore();
  const { inputValues, getInputValue, resetInputValues } =
    useGetValueFromTextInput();

  const validateInputs = (id, password) => {
    setValidationError("");
    const isIdValid = validateId(id);
    const isPasswordValid = validatePassword(password);

    const isValid = isIdValid && isPasswordValid;
    setValidationError(isValid ? "" : "error");

    return isValid;
  };

  const handleMemberVerification = (e) => {
    e.preventDefault();

    const { idInput, pwInput } = inputValues;
    if (validateInputs(idInput, pwInput)) {
      checkUserMutation.mutate({ userId: idInput, pw: pwInput });
    }
  };

  return (
    <CardLayout>
      <InfoText>보호자 정보</InfoText>
      <ProfileWrapper>
        <ProfileImgContainer>
          <ProfileImgText>프로필 이미지</ProfileImgText>
          <DefaultProfileImg />
        </ProfileImgContainer>
        <ProfileInfoWrapper>
          <ProfileInfoContainer>
            <ProfileInfoTitleText>이름</ProfileInfoTitleText>
            <ProfileInfoContentText>{name}</ProfileInfoContentText>
          </ProfileInfoContainer>
          <ProfileInfoContainer>
            <ProfileInfoTitleText>휴대폰</ProfileInfoTitleText>
            <ProfileInfoContentText>{maskedPhone}</ProfileInfoContentText>
          </ProfileInfoContainer>
          <ProfileInfoContainer>
            <ProfileInfoTitleText>Email</ProfileInfoTitleText>
            <ProfileInfoContentText>{maskedEmail}</ProfileInfoContentText>
          </ProfileInfoContainer>
          <ActionButtonContainer>
            <Button
              onClick={() => openModal("memberVerification")}
              variant="normal"
              size="small"
              state="outline"
            >
              정보수정
            </Button>
            <Modal
              title={<>개인정보 수정을 위한 회원확인</>}
              BtnText="확인"
              size="small"
              isModalOpen={isModalOpen}
              modalName="memberVerification"
              onSubmit={handleMemberVerification}
              formName="memberVerification"
              // onClose={resetInputValues}
            >
              <ModalTextContainer>
                <InputForm
                  id="id"
                  name="idInput"
                  placeholder="아이디를 입력해주세요"
                  label="아이디"
                  infoMessage={
                    validationError === "error" ? "다시 확인해주세요" : ""
                  }
                  status={validationError}
                  getInputValue={getInputValue}
                  value={inputValues["idInput"] || ""}
                />
              </ModalTextContainer>
              <ModalTextContainer>
                <InputForm
                  id="id"
                  name="pwInput"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  label="비밀번호"
                  infoMessage={
                    validationError === "error" ? "다시 확인해주세요" : ""
                  }
                  status={validationError}
                  getInputValue={getInputValue}
                  value={inputValues["pwInput"] || ""}
                />
              </ModalTextContainer>
            </Modal>
            <Button variant="normal" size="small" state="default">
              비밀번호 수정
            </Button>
          </ActionButtonContainer>
        </ProfileInfoWrapper>
      </ProfileWrapper>
    </CardLayout>
  );
}

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1008px;
  padding: 24px;
  border-radius: 16px;
  gap: 24px;
  box-shadow: 4px 4px 16px 0px rgba(0, 0, 0, 0.25);
`;

const InfoText = styled.p`
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const ProfileWrapper = styled.div`
  display: flex;
  height: 127.5px;
`;

const ProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  gap: 6px;
  margin-right: 24px;
`;

const ProfileImgText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.neutrals_01};
  text-align: center;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-left: 23px;
  width: 810px;
  height: 127px;
  border-left: 1px solid ${({ theme }) => theme.colors.neutrals_05};
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 221.67px;
  height: 62px;
  gap: 16px;
  text-align: start;
  border-right: 1px solid ${({ theme }) => theme.colors.neutrals_05};
`;

const ProfileInfoTitleText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-align: start;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const ProfileInfoContentText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  gap: 4px;
`;

const ModalTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
