import styled from "@emotion/styled";

export const Flex = styled.div`
  display: flex;
  margin-top: 10px;
`;
export const Input = styled.input(
  ({ theme }) => `
  width: 100%;
  height: 42px;
  font-size: 14px;
  background-color: ${theme.colors.neutrals_08};
  font-family: "SpoqaHanSansNeo", "Arial", "sans-serif";
  border: 1px solid ${theme.colors.neutrals_05};
  border-radius: ${theme.styles.radius};
  text-indent: 12px;
  box-sizing: border-box;
  
  &::placeholder {
    color: ${theme.colors.neutrals_03};
  }

  &:focus {
    border: 2px solid ${theme.colors.neutrals_04};
    outline: none;
    color: ${theme.colors.neutrals_01};
  }
`
);

export const Button = styled.button(({ theme, status }) => ({
  padding: "10px",
  marginLeft: "8px",
  whiteSpace: "nowrap",
  backgroundColor:
    status === "disabled" ? theme.colors.neutrals_05 : theme.colors.neutrals_04,
  outline: "none",
  border: 0,
  color: theme.colors.neutrals_08,
  fontSize: "16px",
  borderRadius: theme.styles.radius,
  fontWeight: 700,
  letterSpacing: "0.5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.neutrals_03,
  },
}));
export const Label = styled.label(({ theme }) => ({
  color: theme.colors.neutrals_01,
  fontWeight: 700,
}));

export const Info = styled.p(({ theme, status }) => ({
  color:
    status === "error"
      ? theme.colors.point_orange_normal_100
      : theme.colors.neutrals_03,
  fontWeight: 400,
  fontSize: "14px",
  marginTop: "10px",
}));
