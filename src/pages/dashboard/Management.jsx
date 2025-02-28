import { useState } from "react";
import { useGetAdminData } from "./hooks/useGetAdminData";
import styled from "@emotion/styled";
import { MenuBox } from "./components/MenuBox";

export function Management() {
  const { getDashBoardStatus } = useGetAdminData();
  const manageStatus = getDashBoardStatus?.data?.data;
  const [status, setStatus] = useState(() => manageStatus);
  const {
    abailableBloodPackCnt,
    awaitApprovalHospitalCnt,
    cumulativeBloocPackCnt,
    dismissalHospitalCnt,
    donationDogCnt,
    freeDonationHospitalCnt,
    generalUserCnt,
    hospitalCnt,
    largeDogTotalCnt,
    paidDonationHospitalCnt,
    patTotalCnt,
  } = status;

  return (
    <>
      <MenuBoxWrapper>
        <MenuTitle>의료기관 회원가입 대기</MenuTitle>
        <BoxContainer>
          <MenuBox title="[승인대기]병원 관리자" data={awaitApprovalHospitalCnt} />
          <MenuBox title="금월[기각]병원 관리자" data={dismissalHospitalCnt} />
        </BoxContainer>
      </MenuBoxWrapper>
      <MenuBoxWrapper>
        <MenuTitle>회원가입 현황</MenuTitle>
        <BoxContainer>
          <MenuBox title="일반 회원 수" data={generalUserCnt} />
          <MenuBox title="병원 관리자 수" data={hospitalCnt} />
        </BoxContainer>
      </MenuBoxWrapper>
      <MenuBoxWrapper>
        <MenuTitle>헌혈관련 현황</MenuTitle>
        <BoxContainer direction="column">
          <Flex>
            <MenuBox title="금일 혈액보유량" data={abailableBloodPackCnt} />
            <MenuBox title="누적 혈액량" data={cumulativeBloocPackCnt} />
            <MenuBox title="유료 헌혈 병원" data={paidDonationHospitalCnt} />
            <MenuBox title="무료 헌혈 병원" data={freeDonationHospitalCnt} />
          </Flex>
          <Flex>
            <MenuBox title="반려견 수" data={patTotalCnt} />
            <MenuBox title="대형견 수" data={largeDogTotalCnt} />
            <MenuBox title="헌혈가능 견 수" data={donationDogCnt} />
          </Flex>
        </BoxContainer>
      </MenuBoxWrapper>
    </>
  );
}

const MenuBoxWrapper = styled.div`
  margin: 0 auto;
  margin-top: 48px;
`;
const MenuTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  display: block;
`;
const BoxContainer = styled.div(
  ({ direction }) => `
  display: flex;
  flex-direction: ${direction === "column" ? "column" : "row"};
  justify-content: center;
  gap: 24px;
`
);
const Flex = styled.div`
  display: flex;
  gap: 24px;
`;
