import { Input } from "@/components/ui/input";
import { InputWithLabel } from "@/components/ui/inputwithlabel";
import { Label } from "@/components/ui/label";
import { Button } from "@/shared/components/buttons/Button";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <LoginLayout>
      <LoginContainer>
        <TextWrapper>
          <LoginText>로그인</LoginText>
          <WelcomeText>
            안녕하세요 :)
            <br /> 반려견 헌혈문화를 함께 만들어요
          </WelcomeText>
        </TextWrapper>
        <InputContainer>
          <InputWrapper>
            <Label htmlFor="id">아이디</Label>
            <Input type="text" id="id" placeholder="아이디를 입력해주세요" />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="text"
              password="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </InputWrapper>
          <LoginOptionsContainer>
            <Checkbox label="로그인 유지" />
            <FindAccountText>아이디 및 비밀번호 찾기</FindAccountText>
          </LoginOptionsContainer>
        </InputContainer>
        <AuthButtonContainer>
          <Button>로그인</Button>
          <Button state="outline">회원가입</Button>
        </AuthButtonContainer>
      </LoginContainer>
    </LoginLayout>
  );
}

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* padding-top: 100px; */
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 100px 0;
  gap: 32px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
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

const InputContainer = styled.div`
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

const FindAccountText = styled(Link)`
  padding: 4px;
  gap: 8px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutrals_01};
`;

const AuthButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
