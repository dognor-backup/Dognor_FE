import { useState } from "react";

const useGetValueFromTextInput = () => {
  const [inputValues, setInputValues] = useState({});

  const getInputValue = ({ name, value }) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };
  return { inputValues, getInputValue, setInputValues };
};
export default useGetValueFromTextInput;
