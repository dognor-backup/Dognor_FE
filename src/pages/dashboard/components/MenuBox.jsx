import styled from "@emotion/styled";

export function MenuBox({ title, data }) {
  return (
    <MenuBoxItem>
      <BoxTitle>{title}</BoxTitle>
      <BoxData>{data}명</BoxData>
    </MenuBoxItem>
  );
}
const MenuBoxItem = styled.div(
  ({ color, theme }) => `
  width: 234px;
  border: 1px solid ${theme.colors.neutrals_04};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 102px;
  justify-content: space-evenly;
  border-radius: 8px
`
);
const BoxTitle = styled.span`
  font-weight: 700;
  font-size: 18px;
`;
const BoxData = styled.span`
  font-size: 18px;
  color: #020202;
`;
