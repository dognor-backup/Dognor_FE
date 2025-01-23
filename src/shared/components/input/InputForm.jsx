import { Flex, Input, Label, Info } from "./inputStyle";

// const { inputValues, getInputValue } = useGetValueFromTextInput();

/* 
  <InputForm
        id="id"
        name="InputName"
        placeholder="placeHolder"
        label="Email"
        infoMessage="Enter your email address"
        status="normal"
        getInputValue={getInputValue}
      />
*/
export const InputForm = ({
  id,
  name,
  placeholder,
  label,
  type,
  infoMessage,
  status,
  getInputValue,
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
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={handleInputValue}
        />
      </Flex>
      <Info status={status}>{infoMessage}</Info>
    </>
  );
};
