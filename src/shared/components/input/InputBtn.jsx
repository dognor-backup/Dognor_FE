import { Button } from "../buttons/Button";
import { Flex, Input, Label, Info } from "./inputStyle";

// const { inputValues, getInputValue } = useGetValueFromTextInput();

/*  <InputBtn
        id="id"
        name="InputName"
        BtnText="Button"
        placeholder="placeHolder"
        label="Email"
        infoMessage="Enter your email address"
        variant="normal"
        getInputValue={getInputValue}
      /> */

export const InputBtn = ({
  id,
  name,
  placeholder,
  label,
  BtnText,
  infoMessage,
  variant,
  getInputValue,
  type,
}) => {
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    getInputValue({ name, value });
  };
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Flex>
        <Input
          type={type || "text"}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleInputValue}
        />
        <Button variant={variant || "noraml"}>{BtnText}</Button>
      </Flex>
      <Info status={status}>{infoMessage}</Info>
    </>
  );
};