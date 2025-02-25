import styled from "@emotion/styled";
import { useState } from "react";

const CheckboxSmall = ({ name, label, checked, ...props }) => {
  return (
    <div>
      <InputChk type="checkbox" name={name} id={name} checked={checked} {...props} />
      <LabelChk htmlFor={name} checked={checked}>
        {label}
      </LabelChk>
    </div>
  );
};
export default CheckboxSmall;

const InputChk = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0 0 0 0);
  overflow: hidden;
  appearance: none;
`;
const LabelChk = styled.label(({ theme, checked }) => ({
  fontWeight: 400,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "14px",
  color: theme.colors.neutrals_01,
  lineHeight: "1.5",
  "&::before": {
    content: "''",
    display: "inline-block",
    marginRight: "8px",
    width: "16px",
    height: "16px",
    border: `1px solid ${theme.colors.neutrals_01}`,
    backgroundColor: checked ? theme.colors.neutrals_01 : theme.colors.neutrals_08,
    borderRadius: "4px",
    backgroundImage: "url('/src/assets/icons/Check_W.svg')",
    backgroundSize: "15px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));
