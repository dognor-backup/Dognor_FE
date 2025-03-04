import React from "react";
import styled from "@emotion/styled";
import SearchIcon from "../../assets/icons/white/magnifying_glass_w.svg?react";
import { Button } from "@/shared/components/buttons/Button";

const SearchComponent = ({ keyword, setKeyword, onSearch }) => {
  return (
    <SearchContainer>
      <Flex>
        <Input
          type="text"
          placeholder="지역, 주소, 병원 상호명을 입력해주세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
        <Button
          variant="normal"
          size="medium"
          state="default"
          onClick={onSearch}
        >
          <SearchIcon />
        </Button>
      </Flex>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
`;

const Input = styled.input`
  flex: 1;
  width: 332px;
  height: 42px;
  left: 12px;
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  border-radius: 6px;
  font-size: 14px;
  outline: none;
`;

export default SearchComponent;
