import { useLogin } from "@/domains/auth/hooks/useLogin";
import { Button } from "@/shared/components/buttons/Button";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import { InputForm } from "@/shared/components/input/InputForm";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import { validateId, validatePassword } from "@/shared/utils/validation";
import styled from "@emotion/styled";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const [rememberMe, setRememberMe] = useState(false);
  const mutation = useLogin(setValidationError);

  const validateInputs = (id, password) => {
    setValidationError("");
    const isIdValid = validateId(id);
    const isPasswordValid = validatePassword(password);

    const isValid = isIdValid && isPasswordValid;
    setValidationError(isValid ? "" : "error");

    return isValid;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setValidationError("");
    const { idInput, pwInput } = inputValues;

    if (validateInputs(idInput, pwInput)) {
      mutation.mutate({ userId: idInput, pw: pwInput, rememberMe });
    }
  };

  const handleSignupClick = () => navigate("/signup");

  return (
    <LoginLayout>
      <TextWrapper>
        <LoginText>로그인</LoginText>
        <WelcomeText>
          안녕하세요 :)
          <br /> 반려견 헌혈문화를 함께 만들어요
        </WelcomeText>
      </TextWrapper>
      <LoginContainer>
        <InputContainer onSubmit={handleLoginSubmit} id="loginForm">
          <InputWrapper>
            <InputForm
              id="id"
              name="idInput"
              placeholder="아이디를 입력해주세요"
              label="아이디"
              infoMessage={validationError === "error" ? "다시 확인해주세요" : ""}
              status={validationError}
              getInputValue={getInputValue}
            />
          </InputWrapper>
          <InputWrapper>
            <InputForm
              id="password"
              name="pwInput"
              placeholder="비밀번호를 입력해주세요"
              label="비밀번호"
              type="password"
              infoMessage={validationError === "error" ? "다시 확인해주세요" : ""}
              status={validationError}
              getInputValue={getInputValue}
            />
          </InputWrapper>
          <LoginOptionsContainer>
            <Checkbox
              name="rememberMe"
              size="medium"
              label="로그인 유지"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            />
            <FindAccountLink to="/findaccount">아이디 및 비밀번호 찾기</FindAccountLink>
          </LoginOptionsContainer>
        </InputContainer>
        <AuthButtonContainer>
          <Button type="submit" form="loginForm">
            로그인
          </Button>
          <Button onClick={handleSignupClick} state="outline">
            회원가입
          </Button>
        </AuthButtonContainer>
      </LoginContainer>
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 230px 0 100px;
  box-sizing: border-box;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin: 0 auto;
  gap: 32px;
`;

const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const LoginText = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const WelcomeText = styled.p`
  font-size: 18px;
  line-height: 1.4;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const InputWrapper = styled.div`
  margin-bottom: 18px;
`;

const LoginOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FindAccountLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const AuthButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
