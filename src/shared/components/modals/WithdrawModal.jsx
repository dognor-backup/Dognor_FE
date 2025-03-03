import styled from "@emotion/styled";
import { useState } from "react";
import { Button } from "../buttons/Button";
import useModalStore from "@/shared/hooks/useModalStore";
import { InputForm } from "@/shared/components/input/InputForm";
import CheckboxSmall from "@/shared/components/checkbox/CheckboxSmall";
import useUserStore from "@/domains/auth/store/useUserStore";
import { useWithdrawUser } from "@/domains/user/hooks/useWithdrawUser";

const WithdrawModal = () => {
  const { closeModal, modalname: activemodalname } = useModalStore();
  const { user } = useUserStore();
  const { mutate: withdraw, isLoading } = useWithdrawUser();
  const [password, setPassword] = useState("");
  const [agreements, setAgreements] = useState({
    agreement1: false,
    agreement2: false,
    agreement3: false,
  });

  const isModalOpen = activemodalname === "WithdrawModal";

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({ ...prev, [name]: checked }));
  };

  const isFormValid =
    agreements.agreement1 &&
    agreements.agreement2 &&
    agreements.agreement3 &&
    password;

  const handleWithdraw = () => {
    if (!isFormValid) return;

    withdraw(
      { userId: user?.userData?.userId, pw: password },
      {
        onSuccess: () => {
          alert("회원 탈퇴가 완료되었습니다.");
          closeModal();
        },
        onError: (error) => {
          alert(error.response?.data?.message || "탈퇴 요청에 실패했습니다.");
        },
      }
    );
  };

  return (
    <WithdrawModalDimmed isModalOpen={isModalOpen} onClick={() => closeModal()}>
      <WithdrawModalContainer onClick={(e) => e.stopPropagation()}>
        <WithdrawModalContent>
          <WithdrawModalHeader>
            <WithdrawCloseBtn onClick={() => closeModal()} />
          </WithdrawModalHeader>
          <WithdrawModalBody>
            <WithdrawModalTitle>
              회원 확인을 위해 <br /> 비밀번호를 입력해주세요.
            </WithdrawModalTitle>

            <WithdrawCheckboxWrapper>
              <CheckboxSmall
                name="agreement1"
                label="회원 개인정보 삭제에 동의합니다."
                checked={agreements.agreement1}
                onChange={handleCheckboxChange}
              />
              <CheckboxSmall
                name="agreement2"
                label="삭제하시지 않고 남기신 게시글과 리뷰는 자동 삭제가 되지 않습니다."
                checked={agreements.agreement2}
                onChange={handleCheckboxChange}
              />
              <CheckboxSmall
                name="agreement3"
                label="탈퇴에 동의합니다."
                checked={agreements.agreement3}
                onChange={handleCheckboxChange}
              />
            </WithdrawCheckboxWrapper>

            <WithdrawInputWrapper>
              <InputForm
                id="password"
                name="password"
                placeholder="비밀번호를 입력하세요"
                type="password"
                label="비밀번호"
                getInputValue={(value) => setPassword(value)}
              />
            </WithdrawInputWrapper>
          </WithdrawModalBody>
          <WithdrawModalFooter>
            <WithdrawButton
              variant="danger"
              size="medium"
              state={isFormValid ? "default" : "disabled"}
              onClick={handleWithdraw}
            >
              탈퇴하기
            </WithdrawButton>
          </WithdrawModalFooter>
        </WithdrawModalContent>
      </WithdrawModalContainer>
    </WithdrawModalDimmed>
  );
};

export default WithdrawModal;

const WithdrawModalDimmed = styled.div(
  ({ isModalOpen }) => `
  background-color: rgba(81, 79, 110, 0.3);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  visibility: ${isModalOpen ? "visible" : "hidden"};
  transition: opacity 0.3s ease-in-out;
`
);

const WithdrawModalContainer = styled.div`
  width: 600px;
  height: 404px;
  background-color: white;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

const WithdrawModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const WithdrawModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const WithdrawCloseBtn = styled.button`
  all: unset;
  width: 24px;
  height: 24px;
  background-image: url("/src/assets/icons/gray/cross_3_g.svg?react");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  cursor: pointer;
`;

const WithdrawModalTitle = styled.div(
  ({ theme }) => `
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: ${theme.colors.neutrals_01};
  text-align: center;
  margin-bottom: 12px;
`
);

const WithdrawModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  flex-grow: 1;
`;

const WithdrawCheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  width: 100%;
`;

const WithdrawInputWrapper = styled.div`
  width: 100%;
`;

const WithdrawModalFooter = styled.div`
  width: 100%;
  margin-top: auto;
`;

const WithdrawButton = styled(Button)`
  width: 100%;
`;
