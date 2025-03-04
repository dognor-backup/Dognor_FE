import { InputForm } from "@/shared/components/input/InputForm";
import { PageTop, PageWrapper } from "@/shared/layout/PageTopTitle";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import LogoNav from "@/shared/components/nav/LogoNav";
import { Button } from "@/shared/components/buttons/Button";
import { Select } from "@/components/ui/select";
import { SelectBox } from "@/shared/components/dropbox/SelectBox";
import { approveHospital } from "./api/dashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function UserInfo() {
  const [userData, setUserData] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const { agreement4, agreement5, userSeq, name, phone, userId, email, userStatus, userRole, hospitalDto } =
    userData || {};
  console.log(userData);
  const userType = userRole === "USER" ? "일반회원" : "병원 관계자";
  const options = ["승인 완료", "승인 대기", "기각"];
  const isHospital = userRole === "HOSPITAL";
  const [approveStatus, setApproveStatus] = useState({ decisionFlag: "", hospitalSeq: userSeq });

  useEffect(() => {
    if (userSeq) {
      setApproveStatus((prev) => ({ ...prev, hospitalSeq: userSeq }));
    }
  }, [userSeq]);

  const HospitalInput = (
    <Info>
      <InfoTitle className="title">병원 정보</InfoTitle>
      <div>
        <InputForm
          id="hospital"
          name="hospital"
          label="병원 상호명"
          status="normal"
          value={hospitalDto?.hospitalName}
          readonly
        />
        <InputForm id="hospitalDto" name="hospitalDto" label="대표자" status="normal" value={name} readonly />
        <InputForm id="userId" name="userId" label="병원 전화번호" status="normal" value={phone} readonly />
      </div>
    </Info>
  );
  const ApproveHospitalMutation = useMutation({
    mutationFn: approveHospital,
    onSuccess: async ({ success, data }) => {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["usersDatas", approveStatus] });
        console.log(data);
      }
    },
  });
  const handleGetValue = (value) => {
    let status = "";
    switch (value * 1) {
      case 1:
        status = "approved";
        break;
      case 3:
        status = "reject";
        break;
      default:
        status = "dismissed";
        break;
    }
    setApproveStatus((prev) => ({ ...prev, decisionFlag: status }));
  };
  const handleCloseWindow = () => {
    console.log(approveStatus);
    if (isHospital) {
      ApproveHospitalMutation.mutate(approveStatus);
    }
    console.log(approveStatus);
    // sessionStorage.removeItem("userData");
    // window.close();
  };

  return (
    <InfoWrapper>
      <LogoNav />
      <PageTop noNav={true} />
      <PageWrapper>
        {isHospital && (
          <SelectContainer>
            <SelectBox
              label="회원 상태"
              optionList={options}
              placeholder={`승인${userStatus}`}
              getValueFromSelect={handleGetValue}
            />
          </SelectContainer>
        )}
        <InfoContainer>
          <Info className="left">
            <div>
              <InfoTitle className="title">회원 정보</InfoTitle>
              <div>
                <InputForm id="name" name="name" label="이름" status="normal" value={name} readonly />
                <InputForm id="phone" name="phone" label="휴대폰" status="normal" value={phone} readonly />
                <InputForm id="userId" name="userId" label="아이디" status="normal" value={userId} readonly />
                <InputForm id="email" name="email" label="이메일" status="normal" value={email} readonly />
              </div>
            </div>
            {isHospital && HospitalInput}
          </Info>
          <Border />
          <Info className="right">
            <InfoTitle className="title">회원 상태</InfoTitle>
            <div>
              <Badge status={userStatus}>{userStatus}</Badge>
              <InfoTitle>회원 구분</InfoTitle>
              <Text>{userType}</Text>
              <InfoTitle>개인정보 승인현황</InfoTitle>
              {agreement4 === 1 ? <Text>[선택] 위치기반서비스 이용약관</Text> : ""}
              {agreement5 === 1 ? <Text>[선택] 이벤트・혜택 정보 수신</Text> : ""}
            </div>
          </Info>
        </InfoContainer>
        <BtnContainer>
          <Button variant="normal" size="small" state="outline" onClick={handleCloseWindow}>
            내역으로 돌아가기
          </Button>
          <Button variant="normal" size="small" state="default">
            회원정보 삭제
          </Button>
        </BtnContainer>
      </PageWrapper>
    </InfoWrapper>
  );
}

const InfoTitle = styled.strong`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  display: block;
  margin-bottom: 16px;
  margin-top: 24px;
  &.title {
    margin-top: 0;
  }
`;
const InfoWrapper = styled.article`
  padding-bottom: 50px;
`;
const InfoContainer = styled.div`
  border-top: 1px solid #170f49;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #170f49;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;
const Info = styled.div`
  width: 100%;
  padding: 16px 0;
  height: inherit;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &.right {
    text-align: center;
    align-self: flex-start;
  }
`;
const Text = styled.p`
  font-size: 14px;
  color: #514f6e;
  line-height: 24px;
`;
const Border = styled.span`
  height: calc(100% - 32px);
  background-color: #a0a3bd;
  width: 1px;
  margin-left: 24px;
  margin-right: 24px;
`;
const Badge = styled.span(
  ({ status }) => `
    padding:  4px 11px;
    background-color: ${status === "완료" ? "#11E5B3" : status === "기각" ? "#F64D4D" : "#4A3AFF"};
    font-weight: 700;
    color: #fff;
    border-radius: 4px;
    width : 100%;
    display: block;
    margin-top: 8px
`
);
const SelectContainer = styled.div`
  width: 230px;
  margin-left: auto;
  margin-bottom: 16px;
`;
