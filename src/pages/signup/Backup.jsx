import { useState } from "react";
import styled from "@emotion/styled";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputBtn } from "@/shared/components/input/InputBtn";
import { InputForm } from "@/shared/components/input/InputForm";
import { Button } from "@/shared/components/buttons/Button";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import HospitalInfo from "./HospitalInfo";
import { PageTop, PageWrapper } from "@/shared/layout/PageTopTitle";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";
import {
  validateId,
  validatePassword,
  validatePhoneNumber,
  validateEmail,
} from "@/shared/utils/validation";
import {
  useCheckDuplicate,
  useVerifyEmail,
} from "@/domains/auth/hooks/useSignup";
import {
  useEmailCheckStore,
  useIdCheckStore,
  useSignupStore,
} from "@/domains/auth/store/useSignupStore";

const SignUp111 = () => {
  const [status, setStatus] = useState("normal");
  const [infoMessage, setInfoMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [isHospitalStaff, setHospitalStaff] = useState(true);
  const { inputValues, getInputValue } = useGetValueFromTextInput();

  const idCheckMutation = useCheckDuplicate();
  const { userId, email, code } = inputValues;

  //회원구분
  const [memberType, setMemberType] = useState("user");
  // console.log(memberType);

  //이메일 인증
  const [isEmailVerified, setIsEmailVertified] = useState();
  const emailVerificationMutation = useVerifyEmail();

  //아이디 인증
  const [isUserIdVerified, setIsUserIdVerified] = useState();
  const { checkedId } = useIdCheckStore();
  const { emailCode } = useEmailCheckStore();
  const { registInfo } = useSignupStore();

  //회원가입 요청
  const signupMutation = useSignupStore();

  //비밀번호
  const [pwError, setPwError] = useState({
    pw: "",
    checkpw: "",
  });
  const [passwords, setPasswords] = useState({
    pw: "",
    checkpw: "",
  });

  // const handleKeyPress = (e) => {
  //   // 숫자가 아닌 키를 누르면 입력 차단
  //   const input = e.target.value;
  //   if (/^[0-9]*$/.test(input)) {
  //     setInputValue(input);
  //     setStatus("normal");
  //     setInfoMessage("");
  //   } else {
  //     setStatus("error");
  //     setInfoMessage("숫자만 입력해주세요");
  //   }
  //   const isValidPhoneNumber = validatePhoneNumber(input);
  // };

  const handleCheckIdDuplicate = () => {
    const isIdValid = validateId(userId);
    if (isIdValid) idCheckMutation.mutate({ userId });
  };

  //이메일 인증 코드 요청
  const handleRequestEmailCode = () => {
    const isEmailValid = validateEmail(email);
    if (isEmailValid) emailVerificationMutation.mutate({ email });
  };

  //인증 코드 확인
  const handleConfirmEmailCode = () => {
    emailCode.data && code == emailCode.data
      ? setIsEmailVertified(true)
      : setIsEmailVertified(false);
  };

  //비밀번호 검사
  const checkPwValidation = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    switch (name) {
      case "pw":
        const isPwValid = validatePassword(value);
        setPwError((prev) => ({
          ...prev,
          pw: isPwValid ? "" : "다시 확인해주세요",
        }));
        break;
    }
  };

  const handleSubmitSignupForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("info", data);
    // console.log(e.target);
    //보낼거 담기
    //signupMutation.mutate({});
  };

  const getCheckValues = (e) => {
    console.log(e.target);
  };

  return (
    <form onSubmit={handleSubmitSignupForm} id="signupForm">
      <PageWrapper>
        <PageTop>
          <h2>회원가입</h2>
          <h3>반려견의 헌혈문화 함께 만들어 볼까요?</h3>
          <span>회원 가입을 위해 필요한 정보를 입력해주세요.</span>
        </PageTop>

        <FormSection>회원구분</FormSection>

        <RadioGroup
          defaultValue="user"
          className="radioFlex"
          onValueChange={(value) => setMemberType(value)}
        >
          <div className="flex items-center space-x-2 ">
            <RadioGroupItem value="user" id="user" />
            <Label htmlFor="user">일반회원</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hospital" id="hospital" />
            <Label htmlFor="hospital">병원관계자</Label>
          </div>
        </RadioGroup>

        {isHospitalStaff && (
          <Info>
            <p>* 동물병원 당, 한개의 아이디를 생성 할 수 있습니다</p>
            <p>* 동물병원 대표원장/대표자 님께서 가입을 부탁드립니다. </p>
            <p>
              * 의료관계자 가입일 경우, 정보 확인 후 7일 이내로 가입 절차가
              진행됩니다
            </p>
          </Info>
        )}
        <FormSection>회원정보[필수]</FormSection>
        <UserInfo>
          <InputForm
            id="name"
            name="name"
            placeholder="실명을 입력해주세요"
            label="이름"
            infoMessage=""
            status="normal"
            getInputValue={getInputValue}
          />
          <InputForm
            className="mgTop16"
            id="phone"
            name="phone"
            placeholder="01012341234 와 같이 입력해주세요"
            label="휴대폰"
            infoMessage={infoMessage}
            // value={inputValue}
            status={status}
            getInputValue={getInputValue}
            //onChange={handleKeyPress}
          />
          <InputBtn
            className="mgTop32"
            id="userId"
            name="userId"
            BtnText="중복조회"
            placeholder="아이디를 입력해주세요"
            label="아이디"
            infoMessage={
              checkedId.data === null
                ? "5~20자의 영문 소문자, 숫자만 사용"
                : checkedId.data === true
                ? "사용 가능한 아이디입니다"
                : "이미 존재하는 아이디입니다"
            }
            status="normal"
            getInputValue={getInputValue}
            onClick={handleCheckIdDuplicate}
            onKeyDown={handleCheckIdDuplicate}
          />
          <InputForm
            className="mgTop16"
            id="pw"
            name="pw"
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호"
            infoMessage={
              pwError.pw === ""
                ? "8~16자의 영 소문자, 숫자, 특수문자 만 사용"
                : pwError.pw
            }
            status={pwError.pw == "" ? "normal" : "error"}
            onChange={checkPwValidation}
          />
          <InputForm
            className="mgTop16"
            id="checkpw"
            name="checkpw"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            label="비밀번호 확인"
            infoMessage={
              passwords.pw === "" || passwords.checkpw === ""
                ? ""
                : passwords.pw.length >= 8 &&
                  passwords.checkpw.match(passwords.pw)
                ? ""
                : "다시 확인해주세요"
            }
            status="normal"
            onChange={checkPwValidation}
          />
          <InputBtn
            className="mgTop32"
            id="email"
            name="email"
            BtnText={isEmailVerified ? "인증 코드 재발송" : "인증 코드 발송"}
            placeholder="이메일을 전체 작성해주세요"
            label="이메일"
            infoMessage="5~20자의 영문 소문자, 숫자 만 사용"
            status="normal"
            getInputValue={getInputValue}
            onClick={handleRequestEmailCode}
          />

          <InputBtn
            className="mgTop16"
            id="code"
            name="code"
            BtnText="인증 코드 확인"
            placeholder="메일로 발송된 코드 6자리를 입력해 주세요"
            label="본인인증(코드작성)"
            infoMessage={
              isEmailVerified === undefined
                ? ""
                : isEmailVerified
                ? "인증이 확인되었습니다"
                : "다시 확인해주세요"
            }
            status="normal"
            getInputValue={getInputValue}
            onClick={handleConfirmEmailCode}
          />
        </UserInfo>

        {/*   병원 정보 입력 */}
        {isHospitalStaff && (
          <>
            <FormSection>병원정보[필수]</FormSection>
            <HospitalInfo />
          </>
        )}

        <div className="center">
          <Button variant="normal">정보 수집 동의서 설명 읽기</Button>
        </div>
        <Checkbox
          className="mgTop26 pdLeft48"
          name="agreement1"
          label="전체 동의하기"
        />
        <Checkbox
          className="mgTop26 pdLeft48"
          name={"agreement2"}
          label="[필수] 만 14세 이상입니다."
        />
        <Checkbox
          className="mgTop26 pdLeft48"
          name={"agreement3"}
          label="[필수] 이용약관"
        />
        <Checkbox
          className="mgTop26 pdLeft48"
          name={"agreement4"}
          label="[필수] 개인정보 수집 및 이용"
        />
        <Checkbox
          className="mgTop26 pdLeft48"
          name={"agreement5"}
          label="[선택] 위치기반서비스 이용약관"
        />
        <Checkbox
          className="mgTop26 pdLeft48"
          name={"agreement6"}
          label="[선택] 이벤트 ・ 혜택 정보 수신 "
        />
        <div className="center">
          <Button style={{ width: "320px" }} form="signupForm">
            {isHospitalStaff ? "의료관계자 가입요청" : "회원 가입하기"}
          </Button>
        </div>
      </PageWrapper>
    </form>
  );
};
export default SignUp111;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.div(
  ({ theme }) => `
font-weight: 700;
color:${theme.colors.point_orange};
line-height: 1.8;
margin-top: 48px
`
);

const FormSection = styled.p`
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 32px;
  margin-top: 50px;
`;
