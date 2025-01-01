import { Flex, Input, Label, Info } from "./inputStyle";

{
  /* <InputForm
placeholder="placeHolder"
type="Email"
info="Enter your email address"
status="normal"
/> */
}

export const InputForm = ({ placeholder, text, type, info, status }) => {
  return (
    <>
      <Label htmlFor="">{type}</Label>
      <Flex>
        <Input type="text" placeholder={placeholder} />
      </Flex>
      <Info status={status}>{info}</Info>
    </>
  );
};
