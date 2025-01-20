import LogoNav from "@/shared/components/nav/LogoNav";
import styled from "@emotion/styled";
import { PageTop, PageWrapper } from "@/shared/layout/PageTopTitle";
import { Button } from "@/shared/components/buttons/Button";
import Footer from "@/shared/components/footer/Footer";

export function SignUpComplete() {
  return (
    <>
      <LogoNav />
      <ContentWrapper>
        <SubText>
          반가워요 :) <br />
          함께 반려견 헌혈문화를 만들어요.
        </SubText>

        <BtnContainer>
          <Button variant="primary" size="medium" state="default">
            HOME으로 가기
          </Button>
          <Button variant="primary" size="medium" state="outline">
            마이페이지로 가기
          </Button>
        </BtnContainer>
      </ContentWrapper>
      <Footer />
    </>
  );
}

const BtnContainer = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  height: calc(100% - 232px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const SubText = styled.h5`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 32px;
  line-height: 24px;
`;
