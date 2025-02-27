import { useState, useEffect } from "react";

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { PageTop, PageWrapper } from "@/shared/layout/PageTopTitle";
import { Button } from "@/shared/components/buttons/Button";
import { InputForm } from "@/shared/components/input/InputForm";
import { InputBtn } from "@/shared/components/input/InputBtn";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import BlackLine from "../../assets/icons/line/Line1008-mypage.svg?react";
import GrayLine from "../../assets/icons/line/Line-754.svg?react";
import { updateUserInfo } from "@/domains/user/api/user";
import { useVerifyEmail } from "@/domains/auth/hooks/useSignup";
import { useEmailCheckStore } from "@/domains/auth/store/useSignupStore";
import { validateEmail } from "@/shared/utils/validation";
import { useGetUserInfo } from "@/domains/user/hooks/useGetUserInfo";
import useModalStore from "@/shared/hooks/useModalStore";
import WithdrawModal from "@/shared/components/modals/WithdrawModal";
import { maskUserId } from "@/shared/utils/dataMasking";

const UserAccountSettings = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { data: userInfoData } = useGetUserInfo();
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const { emailCode } = useEmailCheckStore();
  const [errors, setErrors] = useState({
    email: "",
    code: "",
    phone: "",
  });
  const [checkbox, setCheckbox] = useState({
    agreementAll: false,
    agreement4: false,
    agreement5: false,
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [previousUserInput, setPreviousUserInput] = useState(null);

  const emailVerificationMutation = useVerifyEmail();

  useEffect(() => {
    if (userInfoData.success && userInfoData.data) {
      setCheckbox((prev) => ({
        ...prev,
        agreement4: userInfoData.data.agreement4 === 1,
        agreement5: userInfoData.data.agreement5 === 1,
        agreementAll: userInfoData.data.agreement4 === 1 && userInfoData.data.agreement5 === 1,
      }));
    }
  }, [userInfoData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfoToUpdate = {
      userId: userInfoData.data.userId,
      name: inputValues.name || userInfoData.data.name,
      phone: inputValues.phone || userInfoData.data.phone,
      email: inputValues.email || userInfoData.data.email,
      agreement4: checkbox.agreement4 ? 1 : 0,
      agreement5: checkbox.agreement5 ? 1 : 0,
    };

    try {
      const response = await updateUserInfo(userInfoToUpdate);

      if (response.success) {
        alert(response.msg);
        navigate("/mypage");
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: response.msg,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "회원정보 수정 중 예상치 못한 오류가 발생했습니다.",
      }));
    }
  };

  const handleRequestEmailCode = () => {
    const email = inputValues.email || userInfoData.data.email;
    const isEmailValid = validateEmail(email);

    if (!isEmailValid) {
      return setErrors((prev) => ({
        ...prev,
        email: "이메일 형식을 다시 확인해주세요",
      }));
    }

    emailVerificationMutation.mutate({ email });
    setPreviousUserInput(email);
  };

  const handleConfirmEmailCode = () => {
    const email = inputValues.email || userInfoData.data.email;
    const code = inputValues.code;

    if (!code) {
      setErrors((prev) => ({
        ...prev,
        code: "인증 코드를 입력해주세요.",
      }));
      return;
    }

    if (emailCode?.data === code) {
      setIsEmailVerified(true);
      setErrors((prev) => ({ ...prev, code: "인증 완료" }));
    } else {
      setIsEmailVerified(false);
      setErrors((prev) => ({ ...prev, code: "다시 확인해주세요" }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === "agreementAll") {
      setCheckbox((prev) => ({
        ...prev,
        agreementAll: checked,
        agreement4: checked,
        agreement5: checked,
      }));
    } else {
      setCheckbox((prev) => {
        const updatedState = {
          ...prev,
          [name]: checked,
        };

        updatedState.agreementAll = updatedState.agreement4 && updatedState.agreement5;

        return updatedState;
      });
    }
  };

  const openAgreementPage = () => {
    const newWindow = window.open("/agreement", "_blank");
    newWindow ? newWindow.focus() : alert("새 창을 열 수 없습니다. 팝업 차단 설정을 확인해주세요.");
  };

  if (!userInfoData.success) {
    return <div>loading...</div>;
  }

  return (
    <AccountSettingsWrapper size="medium">
      <PageTop noNav={false}>
        <h2>회원정보 수정</h2>
        <h3>회원님의 정보를 안전하게 관리하세요.</h3>
      </PageTop>
      <AccountSection>회원구분</AccountSection>
      <AccountType>일반회원</AccountType>

      <AccountSection>회원정보</AccountSection>
      <form onSubmit={handleSubmit} id="accountSettingsForm">
        <AccountInfoWrapper>
          <InputGroup>
            <InputForm
              id="name"
              name="name"
              placeholder={userInfoData.data.name}
              label="이름"
              infoMessage=""
              status="normal"
              getInputValue={getInputValue}
            />
            <InputForm
              id="phone"
              name="phone"
              placeholder={userInfoData.data.phone}
              label="휴대폰"
              infoMessage={errors.phone}
              status={errors.phone ? "error" : "normal"}
              getInputValue={getInputValue}
            />
          </InputGroup>

          <InputForm
            id="userId"
            name="userId"
            placeholder={maskUserId(userInfoData.data.userId)}
            label="아이디"
            infoMessage=""
            status="normal"
            getInputValue={getInputValue}
            readOnly
          />

          <InputGroup>
            <InputBtn
              id="email"
              name="email"
              BtnText="인증 코드 발송"
              placeholder={userInfoData.data.email}
              label="이메일"
              infoMessage={errors.email}
              status={errors.email ? "error" : "normal"}
              getInputValue={getInputValue}
              handleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRequestEmailCode();
              }}
            />
            <InputBtnContainer>
              <InputBtn
                id="code"
                name="code"
                BtnText="인증 코드 확인"
                placeholder="메일로 발송된 코드 6자리를 입력해 주세요"
                label="본인인증(코드작성)"
                infoMessage={errors.code}
                status={!isEmailVerified && errors.code ? "error" : "normal"}
                getInputValue={getInputValue}
                handleClick={handleConfirmEmailCode}
              />
            </InputBtnContainer>
          </InputGroup>

          <PasswordResetContainer>
            <Button variant="primary" size="medium" state="outline" type="button">
              비밀번호 재설정하기
            </Button>
          </PasswordResetContainer>
        </AccountInfoWrapper>

        <FullWidthLineContainer>
          <BlackLine />
        </FullWidthLineContainer>

        <CheckBoxWrapper>
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreementAll"
            label="전체 동의하기"
            onChange={handleCheckboxChange}
            checked={checkbox.agreementAll}
          />
          <AgreeInfo>
            실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.
          </AgreeInfo>

          <FullWidthLineContainer>
            <GrayLine />
          </FullWidthLineContainer>

          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement4"
            label="[선택] 위치기반서비스 이용약관"
            onChange={handleCheckboxChange}
            checked={checkbox.agreement4}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement5"
            label="[선택] 이벤트 ・ 혜택 정보 수신"
            onChange={handleCheckboxChange}
            checked={checkbox.agreement5}
          />

          <Center>
            <Button variant="normal" size="medium" state="default" onClick={openAgreementPage} type="button">
              정보 수집 동의서 설명 읽기
            </Button>
          </Center>
        </CheckBoxWrapper>

        <FullWidthLineContainer>
          <BlackLine />
        </FullWidthLineContainer>

        <AccountButtonWrapper>
          <Button
            variant="primary"
            size="medium"
            state="default"
            type="submit"
            style={{ width: "320px", alignSelf: "center" }}
            onClick={handleSubmit}
          >
            정보 수정하기
          </Button>
          <WithdrawalButtonContainer>
            <Button
              variant="normal"
              size="small"
              state="default"
              type="button"
              onClick={() => openModal("WithdrawModal")}
            >
              회원 탈퇴
            </Button>
            <WithdrawModal />
          </WithdrawalButtonContainer>
        </AccountButtonWrapper>
      </form>
    </AccountSettingsWrapper>
  );
};

const AccountSettingsWrapper = styled(PageWrapper)``;

const AccountInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-bottom: 56px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AccountSection = styled.p`
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 32px;
  padding-top: 50px;
`;

const AccountButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 56px;
  gap: 100px;
  margin-bottom: 100px;
`;

const WithdrawalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 40px;
`;

const AccountType = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const PasswordResetContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
`;

const CheckBoxWrapper = styled.div`
  margin-top: 55.5px;
  margin-bottom: 55.5px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const AgreeInfo = styled.div`
  font-size: 14px;
  color: #000000;
  margin: 8px 0 16px;
  padding: 0 40px;
`;

const FullWidthLineContainer = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default UserAccountSettings;
