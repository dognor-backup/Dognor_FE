import styled from "@emotion/styled";

const SelectableCheckbox = ({ name, checked, onChange }) => {
  return (
    <InputChk type="checkbox" name={name} id={name} checked={checked} onChange={onChange} />
  );
};
export default SelectableCheckbox;

const InputChk = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutrals_01};
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  background-color: ${({ checked, theme }) => (checked ? theme.colors.neutrals_01 : theme.colors.neutrals_08)};
  background-image: ${({ checked }) => (checked ? "url('/src/assets/icons/Check_W.svg')" : "none")};
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: center;
`;
