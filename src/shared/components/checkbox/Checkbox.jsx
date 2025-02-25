import styled from "@emotion/styled";

const Checkbox = ({ name, size, label, className, checked, weight, ...props }) => {
  return (
    <div>
      <InputChk type="checkbox" name={name} id={name} checked={checked} {...props} />
      <LabelChk htmlFor={name} checked={checked} size={size} className={className}>
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

const LabelChk = styled.label(({ theme, checked, weight, size }) => ({
  fontWeight: weight === "regular" || size === "small" ? 400 : 700,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  lineHeight: "1.5",
  color: theme.colors.neutrals_01,

  "&::before": {
    content: "",
    display: "inline-block",
    marginRight: "8px",
    width: "24px",
    height: "24px",
    border: `1px solid ${theme.colors.neutrals_01}`,
    backgroundColor: checked ? theme.colors.neutrals_01 : theme.colors.neutrals_08,
    borderRadius: "4px",
    backgroundImage: "url('/assets/icons/Check_W.svg')",
    backgroundSize: "15px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
}));
