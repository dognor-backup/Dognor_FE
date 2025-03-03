import styled from "@emotion/styled";

const PageTop = ({ children, noNav }) => {
  return <TopWrapper noNav={noNav}>{children}</TopWrapper>;
};

const PageWrapper = ({ children, size }) => {
  return <AlignCenter size={size}>{children}</AlignCenter>;
};

export { PageTop, PageWrapper };

const TopWrapper = styled.div(
  ({ noNav }) => `
  margin-top: ${noNav ? "0px" : "130px"};
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
`
);
const AlignCenter = styled.div(
  ({ size }) => `
  margin: 0 auto;
  max-width: ${size === "medium" ? "836px" : "1008px"}

`
);
