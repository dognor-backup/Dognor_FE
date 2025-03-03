import { PageTop, PageWrapper } from "@/shared/layout/PageTopTitle";
import styled from "@emotion/styled";
import { Accordians } from "./Accordians";
import { Button } from "@/shared/components/buttons/Button";

export function Agreement() {
  const handleCloseWindow = () => {
    window.close();
  };
  return (
    <PageWrapper medium>
      <PageTop noNav>
        <h2>반가워요 :)</h2>
        <h3>이용약관 및 개인정보 수집 및 이용에 대한 상세 내용입니다. </h3>
        <span>
          실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.
        </span>
      </PageTop>
      <ContentContainer>
        {AgreementContents.map((content, index) => (
          <BdBtm key={index}>
            <Accordians title={content.title} content={content.content} />
          </BdBtm>
        ))}
      </ContentContainer>
      <AlignCenter>
        <Button
          variant="primary"
          size="medium"
          state="default"
          style={{ width: "320px" }}
          type="button"
          onClick={handleCloseWindow}
        >
          이전 페이지로 되돌아가기
        </Button>
      </AlignCenter>
    </PageWrapper>
  );
}

const ContentContainer = styled.div`
  margin-top: 80px;
`;
const BdBtm = styled.div`
  border-bottom: 1px solid #d9dbe9;
`;
const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;
const AgreementContents = [
  { title: "[필수] 만 14세 이상입니다.", content: "만 14세 이상입니다" },
  { title: "[필수]이용약관", content: "이용약관" },
  { title: "[필수]개인정보 수집 및 이용", content: "개인정보 수집 및 이용" },
  {
    title: "[선택]위치기반서비스 이용약관",
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
  { title: "[선택]개인정보 수집 및 이용", content: "개인정보 수집 및 이용" },
];
