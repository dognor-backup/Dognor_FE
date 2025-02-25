import { useEffect, useState } from "react";
import HospitalInfo from "./HospitalInfo";
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
} from "../../domains/auth/store/useSignupStore";
import styled from "@emotion/styled";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import { InputBtn } from "@/shared/components/input/InputBtn";
import { InputForm } from "@/shared/components/input/InputForm";
import { Button } from "@/shared/components/buttons/Button";
import { PageTop, PageWrapper } from "@/shared/layout/PageTopTitle";

const SignUp = () => {
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const { userId, email, code, pw, checkpw } = inputValues;
  const [memberType, setMemberType] = useState("USER");
  const [numberValue, setNumberValue] = useState("");
  const [hospitalData, setHospitalData] = useState(null);
  const [previousUserInput, setPreviousUserInput] = useState(null);

  const [errors, setErrors] = useState({
    userId: "",
    pw: "",
    checkpw: "",
    phone: "",
    email: "",
    agreement: "",
    code: "",
    isnull: "",
  });
  const [checkbox, setCheckbox] = useState({
    agreementAll: false,
    agreement1: false,
    agreement2: false,
    agreement3: false,
    agreement4: false,
    agreement5: false,
  });
  const [isUserIdVerified, setIsUserIdVerified] = useState();
  const [isEmailVerified, setIsEmailVertified] = useState();
  const idCheckMutation = useCheckDuplicate(setErrors, setIsUserIdVerified);
  const emailVerificationMutation = useVerifyEmail(setErrors);
  const { checkedId } = useIdCheckStore();
  const { emailCode } = useEmailCheckStore();
  const { agreement1, agreement2, agreement3, agreement4, agreement5 } =
    checkbox;
  let isRequiredChecked = agreement1 && agreement2 && agreement3;
  const signupMutation = useUserRegist();

  useEffect(() => {
    const defaultPw = pw || "";
    const defaultCheckPw = checkpw || "";
    const pwErrors = {};
    defaultPw.length > 0 && !validatePassword(pw)
      ? (errors.pw = "다시 확인해주세요")
      : (errors.pw = "");
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

  const handleCheckIdDuplicate = () => {
    const isIdValid = validateId(userId);
    if (!userId || !isIdValid) {
      return setErrors((prev) => ({
        ...prev,
        userId: "다시 확인해주세요",
      }));
    }
    if (isIdValid && previousUserInput !== userId) {
      idCheckMutation.mutate({ userId });
      setPreviousUserInput(userId);
    }
  };

  const handleRequestEmailCode = () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      return setErrors((prev) => ({
        ...prev,
        email: "이메일 형식을 다시 확인해주세요",
      }));
    }
    if (isEmailValid && previousUserInput !== email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
      emailVerificationMutation.mutate({ email });
      setPreviousUserInput(email);
    }
    setErrors((prev) => ({
      ...prev,
      email: "",
    }));
  };

  const handleConfirmEmailCode = () => {
    if (emailCode?.data === code) {
      setIsEmailVertified(true);
      setErrors((prev) => ({ ...prev, code: "인증 완료" }));
    } else {
      setIsEmailVertified(false);
      setErrors((prev) => ({ ...prev, code: "다시 확인해주세요" }));
    }
  };

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
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const userRole = memberType;
    const {
      userId,
      pw,
      name,
      email,
      hospitalName,
      representativeName,
      address,
      addressDetail,
      postalCode,
      hospitalPhone,
    } = data;

    if (!isRequiredChecked) {
      return setErrors((prev) => ({
        ...prev,
        agreement: "필수 동의 항목을 다시 확인하세요",
      }));
    }

    const hasEmptyField = Object.entries(data).some(([_, value]) => {
      if (value.trim() === "") {
        setErrors((prev) => ({
          ...prev,
          isnull: "빈칸을 모두 작성해 주세요",
        }));
        return true;
      }
      return false;
    });

    if (!hasEmptyField) {
      setErrors((prev) => ({
        ...prev,
        isnull: "",
      }));
    } else {
      return;
    }
    if (isUserIdVerified || !isEmailVerified) return;

    const userInfo = {
      userId,
      pw,
      name,
      phone: numberValue,
      email,
      userRole,
      agreement1,
      agreement2,
      agreement3,
      agreement4,
      agreement5,
    };

    switch (memberType) {
      case "USER":
        signupMutation.mutate(userInfo);
        break;
      case "HOSPITAL":
        isRequiredChecked =
          agreement1 &&
          agreement2 &&
          agreement3 &&
          hospitalData.agreementHospital;
        if (!isRequiredChecked) {
          return setErrors((prev) => ({
            ...prev,
            agreement: "필수 동의 항목을 다시 확인해주세요",
          }));
        }
        userInfo.hospital = {
          hospitalName,
          representativeName,
          address,
          addressDetail,
          postalCode,
          hospitalPhone,
          agreement1: Number(hospitalData.agreementHospital),
          donationYn: Number(hospitalData.isDonationPossible),
          donationFreeYn: Number(hospitalData.donationPrice),
        };

        signupMutation.mutate(userInfo);
        break;
      default:
        break;
    }
  };

  const getCheckValues = (e) => {
    const { name, checked } = e.target;
    const value = checked ? 1 : 0;
    if (name === "agreementAll") {
      setCheckbox({
        agreementAll: value,
        agreement1: value,
        agreement2: value,
        agreement3: value,
        agreement4: value,
        agreement5: value,
      });
    } else {
      setCheckbox((prev) => ({
        ...prev,
        [name]: value,
        agreementAll: 0,
      }));
    }
  };
  const openAgreementPage = () => {
    const newWindow = window.open("/agreement", "_blank");
    newWindow
      ? newWindow.focus()
      : alert("새 창을 열 수 없습니다. 팝업 차단 설정을 확인해주세요.");
  };
  const getValueFromHospital = (data) => setHospitalData(data);

  return (
    <form onSubmit={handleSubmitSignupForm} id="signupForm">
      <PageWrapper size="medium">
        <PageTop noNav={false}>
          <h2>회원가입</h2>
          <h3>반려견의 헌혈문화 함께 만들어 볼까요?</h3>
          <span>회원 가입을 위해 필요한 정보를 입력해주세요.</span>
        </PageTop>
        <FormSection>회원구분</FormSection>
        <RadioGroup
          defaultValue="USER"
          className="radioFlex"
          onValueChange={(value) => setMemberType(value)}
        >
          <div className="flex items-center space-x-2 ">
            <RadioGroupItem value="USER" id="USER" />
            <Label htmlFor="USER">일반회원</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="HOSPITAL" id="HOSPITAL" />
            <Label htmlFor="HOSPITAL">병원관계자</Label>
          </div>
        </RadioGroup>

        {memberType === "HOSPITAL" ? (
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
            infoMessage=""
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
            infoMessage={errors.email && errors.email}
            status={errors.email && "error"}
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
        {memberType === "HOSPITAL" ? (
          <>
            <FormSection>병원정보[필수]</FormSection>
            <HospitalInfo getValueFromHospital={getValueFromHospital} />
          </>
        ) : (
          ""
        )}
        <Center>
          <Button variant="normal" onClick={openAgreementPage}>
            정보 수집 동의서 설명 읽기
          </Button>
        </Center>
        <CheckBoxWrapper>
          <CheckboxContainer>
            <Checkbox
              className="mgTop26 pdLeft48"
              name="agreementAll"
              label="전체 동의하기"
              onChange={getCheckValues}
              checked={checkbox.agreementAll}
            />
            <AgreeInfo>
              실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택),
              이벤트・혜택 정보 수신(선택) 동의를 포함합니다.
            </AgreeInfo>
          </CheckboxContainer>
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement1"
            label="[필수] 만 14세 이상입니다."
            onChange={getCheckValues}
            checked={checkbox.agreement1}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement2"
            label="[필수] 이용약관"
            onChange={getCheckValues}
            checked={checkbox.agreement2}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement3"
            label="[필수] 개인정보 수집 및 이용"
            onChange={getCheckValues}
            checked={checkbox.agreement3}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement4"
            label="[선택] 위치기반서비스 이용약관"
            onChange={getCheckValues}
            checked={checkbox.agreement4}
          />
          <Checkbox
            className="mgTop26 pdLeft48"
            name="agreement5"
            label="[선택] 이벤트 ・ 혜택 정보 수신"
            onChange={getCheckValues}
            checked={checkbox.agreement5}
          />
        </CheckBoxWrapper>
        {!isRequiredChecked && <Error>{errors.agreement}</Error>}
        {memberType === "HOSPITAL" &&
          !hospitalData?.agreementHospital &&
          !errors.isnull && <Error>{errors.agreement}</Error>}
        {isRequiredChecked && errors.isnull && <Error>{errors.isnull}</Error>}
        <div className="center">
          <BtnContainer>
            <Button
              style={{ width: "320px", marginBottom: "100px" }}
              form="signupForm"
            >
              {memberType === "HOSPITAL"
                ? "의료관계자 가입요청"
                : "회원 가입하기"}
            </Button>
            {memberType === "HOSPITAL" && (
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
  padding-bottom: 56px;
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
const CheckboxContainer = styled.div`
  position: relative;
  height: 72px;
  ::after {
    content: "";
    display: block;
    width: 754px;
    background-image: url("/src/assets/icons/line/line_754.svg");
    height: 5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    position: absolute;
    bottom: -10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`;
const AgreeInfo = styled.p`
  font-weight: 400;
  font-size: 14px;
  position: absolute;
  left: 80px;
  bottom: 16px;
`;
const Error = styled.div(
  ({ theme }) => `
  font-weight: 700;
  color:${theme.colors.point_orange};
  line-height: 1.8;
  text-align: center;
  margin-bottom: 56px;
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
const CheckBoxWrapper = styled.div`
  margin-bottom: 56px;
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 56px;
  position: relative;
  z-index: 0;
  ::before {
    content: "";
    position: absolute;
    top: 0;
    width: 920px;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
    height: 5px;
    display: block;
    background: url("/src/assets/icons/line/line_1008.svg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
  }
`;
