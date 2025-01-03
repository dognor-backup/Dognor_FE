import styled from "@emotion/styled";

export const LogoutBtn = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.neutrals_02};
  padding: 8px 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  border: none;
`;
