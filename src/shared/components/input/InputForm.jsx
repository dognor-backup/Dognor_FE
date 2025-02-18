import { Flex, Input, Label, Info, Layout } from "./inputStyle";

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
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
  value,
  onChange,
}) => {
  const handleInputValue = (e) => {
    const { name, value } = e.target;
    getInputValue({ name, value });
    if (onChange) {
      onChange(e);
    }
    if (getInputValue) {
      getInputValue({ name, value });
    }
  };

  return (
    <Layout>
      <Label htmlFor={id}>{label}</Label>
      <Flex>
        <Input
          type={type || "text"}
          id={id}
          name={name}
          placeholder={placeholder}
          onChange={handleInputValue}
          value={value}
        />
      </Flex>
      <Info status={status}>{infoMessage}</Info>
    </Layout>
  );
};
