import { useEffect, useState } from "react";
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
  useUserRegist,
  useVerifyEmail,
} from "@/domains/auth/hooks/useSignup";
import {
  useEmailCheckStore,
  useIdCheckStore,
  useSignupStore,
} from "@/domains/auth/store/useSignupStore";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const { userId, email, code, pw, checkpw } = inputValues;
  const [numberValue, setNumberValue] = useState("");
  const navigate = useNavigate();
  //에러일 때
  const [errors, setErrors] = useState({
    userId: "",
    pw: "",
    checkpw: "",
    phone: "",
    email: "",
    agreement: "",
    code: "",
  });

  useEffect(() => {
    const defaultPw = pw || "";
    const defaultCheckPw = checkpw || "";
    const pwErrors = {};

    //비밀번호 유효성 검사
    defaultPw.length > 0 && !validatePassword(pw)
      ? (errors.pw = "다시 확인해주세요")
      : (errors.pw = "");

    //비밀번호 재확인
    defaultPw.length > 0 &&
    defaultCheckPw.length > 0 &&
    defaultPw !== defaultCheckPw
      ? (errors.checkpw = "다시 확인해주세요")
      : (errors.checkpw = "");

    setErrors((prev) => ({
      ...prev,
      ...pwErrors,
    }));
  }, [pw, checkpw]);

  //체크박스
  const [checkbox, setCheckbox] = useState({
    agreementAll: false,
    agreement1: false,
    agreement2: false,
    agreement3: false,
    agreement4: false,
    agreement5: false,
  });

  const { agreement1, agreement2, agreement3 } = checkbox;
  const isRequiredChecked = agreement1 && agreement2 && agreement3;
  //회원구분
  const [memberType, setMemberType] = useState("user");

  //이메일 인증
  const [isEmailVerified, setIsEmailVertified] = useState();
  const emailVerificationMutation = useVerifyEmail();

  //아이디 인증
  const [isUserIdVerified, setIsUserIdVerified] = useState();
  const idCheckMutation = useCheckDuplicate(setErrors, setIsUserIdVerified);

  const { checkedId } = useIdCheckStore();
  const { emailCode } = useEmailCheckStore();
  const { registInfo } = useSignupStore();

  //아이디 중복 체크 요청 true면 중복 false면 중복 아님
  const signupMutation = useUserRegist();

  const handleCheckIdDuplicate = () => {
    const isIdValid = validateId(userId);
    if (!userId || !validateId(userId)) {
      return setErrors((prev) => ({
        ...prev,
        userId: "다시 확인해주세요",
      }));
    }
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
    isEmailVerified
      ? setErrors((prev) => ({ ...prev, code: "인증 완료" }))
      : setErrors((prev) => ({ ...prev, code: "다시 확인해주세요" }));
  };

  //휴대폰 번호
  const handleKeyPress = (e) => {
    const { value } = e.target;
    if (/^[0-9]*$/.test(value)) setNumberValue(value);
    const isValidPhoneNumber = validatePhoneNumber(value);
    setErrors((prev) => ({
      ...prev,
      phone: isValidPhoneNumber ? "" : "숫자만 입력 가능합니다",
    }));
  };

  const handleSubmitSignupForm = (e) => {
    e.preventDefault();

    // 필수 체크 항목 확인
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    //const { userId, pw, name, phone, email, userRole } = data;
    if (!isRequiredChecked) {
      return setErrors((prev) => ({
        ...prev,
        agreement: "필수 동의 항목을 다시 확인해세요", // 에러 메시지 추가
      }));
    }
    if (
      Object.entries(data).forEach(([key, value]) => {
        if (value.trim() === "") {
          return setErrors((prev) => ({ ...prev, [key]: "다시 확인해주세요" }));
        }
      })
    )
      if (isUserIdVerified || !isEmailVerified) {
        return console.log("인증해쥇요");
      }
    /*  signupMutation.mutate({
      userId,
      pw,
      name,
      phone,
      email,
      userRole,
      agreement1,
      agreement2,
      agreement3,
      agreement4,
      agreement5,
    });
    console.log("폼제출 성공", data); */
  };

  const getCheckValues = (e) => {
    const { name, checked } = e.target;

    if (name === "agreementAll") {
      setCheckbox({
        agreementAll: checked,
        agreement1: checked,
        agreement2: checked,
        agreement3: checked,
        agreement4: checked,
        agreement5: checked,
      });
    } else {
      setCheckbox((prev) => ({
        ...prev,
        [name]: checked,
        agreementAll: false,
      }));
    }
  };
  const openAgreementPage = () => {
    const newWindow = window.open("/agreement", "_blank");
    if (newWindow) {
      // 새 창이 성공적으로 열렸을 경우
      newWindow.focus();
    } else {
      // 팝업 차단으로 인해 새 창이 열리지 않은 경우
      alert("새 창을 열 수 없습니다. 팝업 차단 설정을 확인하세요.");
    }
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

        {memberType === "hospital" ? (
          <Info>
            <p>* 동물병원 당, 한개의 아이디를 생성 할 수 있습니다</p>
            <p>* 동물병원 대표원장/대표자 님께서 가입을 부탁드립니다. </p>
            <p>
              * 의료관계자 가입일 경우, 정보 확인 후 7일 이내로 가입 절차가
              진행됩니다
            </p>
          </Info>
        ) : (
          ""
        )}
        <FormSection>회원정보[필수]</FormSection>
        <UserInfo>
          <InputForm
            id="name"
            name="name"
            placeholder="실명을 입력해주세요"
            label="이름"
            infoMessage={errors.name && errors.name}
            status="normal"
            getInputValue={getInputValue}
          />
          <InputForm
            className="mgTop20"
            id="phone"
            name="phone"
            placeholder="01012341234 와 같이 입력해주세요"
            label="휴대폰"
            infoMessage={errors.phone && errors.phone}
            status={errors.phone && "error"}
            value={numberValue}
            getInputValue={getInputValue}
            onChange={handleKeyPress}
          />
          <InputBtn
            className="mgTop32"
            id="userId"
            name="userId"
            BtnText="중복조회"
            placeholder="아이디를 입력해주세요"
            label="아이디"
            infoMessage={
              errors.userId === ""
                ? "5~20자의 영문 소문자, 숫자 만 사용"
                : errors.userId
            }
            status={checkedId.data && "error"}
            getInputValue={getInputValue}
            onClick={handleCheckIdDuplicate}
          />
          <InputForm
            className="mgTop20"
            id="pw"
            name="pw"
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호"
            infoMessage={
              errors.pw
                ? errors.pw
                : "8~16자의 영 소문자, 숫자, 특수문자 만 사용"
            }
            status={errors.pw && "error"}
            getInputValue={getInputValue}
          />
          <InputForm
            className="mgTop20"
            id="checkpw"
            name="checkpw"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            label="비밀번호 확인"
            infoMessage={errors.checkpw && errors.checkpw}
            status={errors.checkpw && "error"}
            getInputValue={getInputValue}
          />
          <InputBtn
            className="mgTop32"
            id="email"
            name="email"
            BtnText={emailCode.data ? "인증 코드 재발송" : "인증 코드 발송"}
            placeholder="이메일을 전체 작성해주세요"
            label="이메일"
            infoMessage="5~20자의 영문 소문자, 숫자 만 사용"
            status="normal"
            getInputValue={getInputValue}
            onClick={handleRequestEmailCode}
          />

          <InputBtn
            className="mgTop20"
            id="code"
            name="code"
            BtnText="인증 코드 확인"
            placeholder="메일로 발송된 코드 6자리를 입력해 주세요"
            label="본인인증(코드작성)"
            infoMessage={errors.code && errors.code}
            status={!isEmailVerified && errors.code && "error"}
            getInputValue={getInputValue}
            onClick={handleConfirmEmailCode}
          />
        </UserInfo>

        {/*   병원 정보 입력 */}
        {memberType === "hospital" ? (
          <>
            <FormSection>병원정보[필수]</FormSection>
            <HospitalInfo />
          </>
        ) : (
          ""
        )}

        <div className="center">
          <Button variant="normal" onClick={openAgreementPage}>
            정보 수집 동의서 설명 읽기
          </Button>
        </div>
        <CheckBoxContainer>
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreementAll"
            label="전체 동의하기"
            onChange={getCheckValues}
            isChecked={checkbox.agreementAll}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement1"
            label="[필수] 만 14세 이상입니다."
            onChange={getCheckValues}
            isChecked={checkbox.agreement1}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement2"
            label="[필수] 이용약관"
            onChange={getCheckValues}
            isChecked={checkbox.agreement2}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement3"
            label="[필수] 개인정보 수집 및 이용"
            onChange={getCheckValues}
            isChecked={checkbox.agreement3}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement4"
            label="[선택] 위치기반서비스 이용약관"
            onChange={getCheckValues}
            isChecked={checkbox.agreement4}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement5"
            label="[선택] 이벤트 ・ 혜택 정보 수신 "
            onChange={getCheckValues}
            isChecked={checkbox.agreement5}
          />
        </CheckBoxContainer>
        {!isRequiredChecked && <Error>{errors.agreement}</Error>}
        <div className="center">
          <BtnContainer>
            <Button
              style={{ width: "320px", marginBottom: "100px" }}
              form="signupForm"
            >
              {memberType === "hospital"
                ? "의료관계자 가입요청"
                : "회원 가입하기"}
            </Button>
            {memberType === "hospital" && (
              <InfoBlue>
                *추가 확인이 필요할 시 안내 메일이 발송됩니다.
              </InfoBlue>
            )}
          </BtnContainer>
        </div>
      </PageWrapper>
    </form>
  );
};
export default SignUp;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;
`;

const Info = styled.div(
  ({ theme }) => `
font-weight: 700;
color:${theme.colors.point_orange};
line-height: 1.8;
margin-top: 48px
`
);
const InfoBlue = styled.div(
  ({ theme }) => `
  font-weight: 700;
  color:${theme.colors.primary_blue};
  position: absolute;
  top: 60px;
      right: 0;
    left: 0;
    text-align: center;
   `
);
const Error = styled.div(
  ({ theme }) => `
font-weight: 700;
color:${theme.colors.point_orange};
line-height: 1.8;
text-align: center;
margin-bottom: 56px
`
);

const BtnContainer = styled.div`
  position: relative;
`;
const FormSection = styled.p`
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 32px;
  padding-top: 50px;
`;
const CheckBoxContainer = styled.div`
  margin-bottom: 56px;
`;
