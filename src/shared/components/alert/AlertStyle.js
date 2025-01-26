import styled from "@emotion/styled";

export const AlertWrapper = styled.div(
  ({ isAlertOpen }) => `
  background-color: #514f6e4d;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
  transition: opacity 0.25s ease-in;
  visibility: ${isAlertOpen ? "visible" : "hidden"};

    &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(2px);
    z-index: -1;
  }
`
);
export const AlertContnet = styled.div(
  ({ theme, isAlertOpen }) => `
  width: 320px;
  background-color: #fff;
  border-radius: 16px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: ${theme.shadow};
  border: 1px solid ${theme.neutrals_05};
   opacity: ${isAlertOpen ? 1 : 0};
  transition: opacity 0.5s ease-in;
  visibility: ${isAlertOpen ? "visible" : "hidden"};

`
);
export const AlertHeader = styled.div`
  width: 100%;
  position: relative;
  height: 24px;
  margin-bottom: 24px;
`;
export const AlertClose = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0px;
  top: 0px;
  display: inline-block;
  background-image: url("/src/assets/icons/gray/cross_3_g.svg");
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 20px;
  background-color: transparent;
`;
export const AlertBody = styled.p(
  ({ theme }) => `
  color: ${theme.colors.neutrals_01};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  line-height:1.5;
  `
);
export const AlertBottom = styled.div(
  ({ flex }) => `
  width: 100%;
  display: flex;
  flex-direction: ${flex}? "row" : "column";
   gap: ${flex ? "4px" : "0px"};

`
);
export const AlertIcon = styled.span`
  font-size: 64px;
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;
