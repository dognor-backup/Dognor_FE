import { Button } from "@/shared/components/buttons/Button";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import { InputForm } from "@/shared/components/input/InputForm";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import { validateId, validatePassword } from "@/shared/utils/validation";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const [isIdValid, setIsIdValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState("");
  const { inputValues, getInputValue } = useGetValueFromTextInput();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const id = inputValues.idInput;
    const password = inputValues.pwInput;

    if (!validateId(id)) setIsIdValid("error");
    if (!validatePassword(password)) return setIsPasswordValid("error");
  };

  getInputValue;
  const handleSignupClick = () => {
    navigate("/signup");
  };
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
              ref={idRef}
              id="id"
              name="idInput"
              placeholder="아이디를 입력해주세요"
              label="아이디"
              infoMessage={isIdValid === "error" ? "다시 확인해주세요" : ""}
              status={isIdValid}
              getInputValue={getInputValue}
            />
          </InputWrapper>
          <InputWrapper>
            <InputForm
              ref={pwRef}
              id="id"
              name="pwInput"
              placeholder="비밀번호를 입력해주세요"
              label="비밀번호"
              infoMessage={
                isPasswordValid === "error" ? "다시 확인해주세요" : ""
              }
              status={isPasswordValid}
              getInputValue={getInputValue}
            />
          </InputWrapper>

          <LoginOptionsContainer>
            <Checkbox
              name={"체크박스 이름"}
              size={"medium"}
              label={"로그인 유지"}
            />
            <FindAccountLink to="/findaccount">
              아이디 및 비밀번호 찾기
            </FindAccountLink>
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
  justify-content: center;
  width: 100%;
  flex-direction: column;
  /* height: 100%; */
  margin-top: 130px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  margin: 0 auto;
  /* padding: 100px 0; */
  gap: 32px;
  padding-bottom: 100px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 100px 0 32px 0;
  /* margin: 130px 0 32px 0; */
`;

const LoginText = styled.p`
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const WelcomeText = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 18px;
`;

const LoginOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FindAccountLink = styled(Link)`
  padding: 4px;
  gap: 8px;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const AuthButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputDescription = styled.p`
  display: ${({ isVisible }) => (isVisible === "true" ? "none" : "block")};
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.point_orange_normal_300};
`;
