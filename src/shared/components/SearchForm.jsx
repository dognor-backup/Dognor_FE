import { IconBtn } from "./buttons/IconBtn";
import styled from "@emotion/styled";
import SearchIcon from "/src/assets/icons/white/magnifying_glass_w.svg?react";
export function SearchForm() {
  return (
    <>
      <SearchFormContainer>
        <Input type="text" placeholder="회원조회" />
        <IconBtn variant="normal" size="medium" state="default">
          <SearchIcon />
        </IconBtn>
      </SearchFormContainer>
    </>
  );
}

const SearchFormContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
const Input = styled.input(
  ({ theme }) => `
    border: 1px solid ${theme.colors.neutrals_05};
    border-radius: 6px;
    font-size: 14px;
    text-indent: 12px;
    outline: none;
    width: 312px;
`
);
