import { Button } from "@/shared/components/buttons/Button";
import { Cards } from "./components/Cards";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import Bannner from "/src/assets/images/Campaigns_01.png?react";
export default function Campaigns() {
  const navigate = useNavigate();
  return (
    <>
      <Banner src={Bannner}></Banner>
      <PageWrapper>
        <PageTop noNav={true}>
          <h2>캠페인</h2>
          <p>
            우리 강아지가 다른 친구들을 함께하는 캠페인과 이벤트
            <br /> 그리고 다양한 소식을 전한는 공간입니다.
          </p>
        </PageTop>
        <CardWrapper>
          <Cards></Cards>
        </CardWrapper>

        <BtnContainer>
          <Button onClick={() => navigate("/campaigns/postnew")} variant="secondary" style={{ width: "320px" }}>
            글 작성하기
          </Button>
        </BtnContainer>
      </PageWrapper>
    </>
  );
}
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  margin-top: 48px;
`;
const Banner = styled.img`
  margin-top: 130px;
  height: 220px;
  width: 100%;
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
`;
