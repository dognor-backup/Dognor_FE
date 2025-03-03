import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styled from "@emotion/styled";

export function SelectBox({
  label,
  getValueFromSelect,
  optionList,
  value,
  placeholder = "게시판을 선택해주세요",
}) {
  return (
    <SelectContainer>
      <BoxLabel>{label}</BoxLabel>
      <Select value={value} onValueChange={(prev) => getValueFromSelect(prev)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {optionList.map((item, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SelectContainer>
  );
}

const BoxLabel = styled.span(
  ({ theme }) => `
    font-size: 16px;
    font-weight: 700;
    display: inline-block;
    margin-bottom: 10px;
    color: ${theme.colors.neutrals01};
  `
);
const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
