import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/shared/components/buttons/Button";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import { validateId, validatePassword } from "@/shared/utils/validation";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const [isIdValid, setIsIdValid] = useState("true");
  const [isPasswordValid, setIsPasswordValid] = useState("true");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const password = pwRef.current.value;

    if (!validateId(id)) setIsIdValid("false");
    if (!validatePassword(password)) return setIsPasswordValid("false");
  };

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
            <Label htmlFor="id">아이디</Label>
            <Input
              ref={idRef}
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요"
              required
            />
            <InputDescription isVisible={isIdValid}>
              다시 확인해주세요
            </InputDescription>
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              ref={pwRef}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              required
            />
            <InputDescription isVisible={isPasswordValid}>
              다시 확인해주세요
            </InputDescription>
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
  gap: 18px;
`;

const InputWrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 24rem;
  align-items: center;
  gap: 0.375rem;
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
