import { theme } from "@/shared/styles/theme";
import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 8px;
`;
export const Input = styled.input(({ theme }) => ({
  width: "100%",
  height: "42px",
  fontSize: "14px",
  backgroundColor: theme.colors.neutrals_08,
  fontFamily: `"SpoqaHanSansNeo", "Arial", "sans-serif"`,
  "::placeholder": {
    color: theme.colors.neutrals_03,
  },
  "&:focus": {
    border: `2px solid ${theme.colors.neutrals_04}`,
    outline: "none",
    color: theme.colors.neutrals_01,
  },
  border: `1px solid ${theme.colors.neutrals_05}`,
  borderRadius: theme.styles.radius,
  textIndent: "12px",
  boxSizing: "border-box",
}));

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
}));
