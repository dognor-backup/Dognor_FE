import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import styled from "@emotion/styled";

export function SelectBox({ label, getValueFromSelect, optionList, value, placeholder }) {
  const handleChange = (value) => {
    getValueFromSelect(value);
  };
  return (
    <SelectContainer>
      <BoxLabel>{label}</BoxLabel>
      <Select onValueChange={handleChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {optionList.map((item, index) => (
            <SelectItem key={index} value={item.code.toString()}>
              {item.name}
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
