import styled from "@emotion/styled";
import { useState } from "react";

const Checkbox = ({ name, label, weight }) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <div>
      <InputChk
        type="checkbox"
        name={name}
        id={name}
        onChange={() => setChecked((prev) => !prev)}
        checked={isChecked}
      />
      <LabelChk htmlFor={name} checked={isChecked} weight={weight}>
        {label}
      </LabelChk>
    </div>
  );
};
export default Checkbox;

const InputChk = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0 0 0 0);
  overflow: hidden;
  appearance: none;
`;
const LabelChk = styled.label(({ theme, checked, weight }) => ({
  fontWeight: weight === "regular" ? 400 : 700,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: weight === "regular" ? "14px" : "16px",
  color: theme.colors.neutrals_01,
  lineHeight: "1.5",
  "&::before": {
    content: '""',
    display: "inline-block",
    marginRight: "8px",
    width: "24px",
    height: "24px",
    border: `1px solid ${theme.colors.neutrals_01}`,
    backgroundColor: !checked ? theme.colors.neutrals_08 : theme.colors.neutrals_01,
    borderRadius: "4px",
    backgroundImage: "url('/src/assets/icons/Check_W.svg')",
    backgroundSize: "15px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));
