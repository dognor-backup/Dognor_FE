import { Flex, Input, Button, Label, Info } from "./inputStyle";

{
  /* <InputBtn
text="Button"
placeholder="placeHolder"
type="Email"
info="Enter your email address"
status="normal"
/> */
}

export const InputBtn = ({ placeholder, text, type, info, status }) => {
  return (
    <>
      <Label htmlFor="">{type}</Label>
      <Flex>
        <Input type="text" placeholder={placeholder} />
        <Button status={status}>{text}</Button>
      </Flex>
      <Info status={status}>{info}</Info>
    </>
  );
};
