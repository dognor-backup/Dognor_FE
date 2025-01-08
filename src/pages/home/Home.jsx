import { InputForm } from "@/shared/components/input/InputForm";
import useGetValueFromTextInput from "@/shared/hooks/useGetValueFromTextInput";

export default function Home() {
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  return (
    <div
      style={{
        marginBottom: "200px",
      }}
    >
      <InputForm
        id="id"
        name="InputName"
        placeholder="placeHolder"
        label="Email"
        infoMessage="Enter your email address"
        status="normal"
        getInputValue={getInputValue}
      />
    </div>
  );
}
