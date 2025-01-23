import styled from "@emotion/styled";

const PageTop = ({ children }) => {
  return <TopWrapper>{children}</TopWrapper>;
};

const PageWrapper = ({ children }) => {
  return <AlignCenter>{children}</AlignCenter>;
};
export { PageTop, PageWrapper };

const TopWrapper = styled.div`
  margin-top: 130px;
  text-align: center;
  padding-top: 100px;

  h2 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.5;
  }
  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 18px;
    line-height: 1.5;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }
`;
const AlignCenter = styled.div`
  margin: 0 auto;
  max-width: 1008px;
`;
