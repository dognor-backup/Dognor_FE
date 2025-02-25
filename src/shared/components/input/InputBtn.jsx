import { Flex, Input, Button, Label, Info } from "./inputStyle";

// const { inputValues, getInputValue } = useGetValueFromTextInput();

/*  <InputBtn
        id="id"
        name="InputName"
        BtnText="Button"
        placeholder="placeHolder"
        label="Email"
        infoMessage="Enter your email address"
        status="normal"
        getInputValue={getInputValue}
      /> */

export const InputBtn = ({
  id,
  name,
  placeholder,
  label,
  BtnText,
  infoMessage,
  status,
  getInputValue,
  handleClick,
  className,
  ...props
}) => {
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    getInputValue({ name, value });
  };
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Flex>
        <Input type="text" name={name} id={id} placeholder={placeholder} onChange={handleInputValue} {...props} />
        <Button status={status} onClick={handleClick} {...props} type="button">
          {BtnText}
        </Button>
      </Flex>
      <Info status={status}>{infoMessage}</Info>
    </div>
  );
};
