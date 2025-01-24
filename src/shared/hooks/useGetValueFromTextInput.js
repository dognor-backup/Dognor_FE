import { useState } from "react";

const useGetValueFromTextInput = () => {
  const [inputValues, setInputValues] = useState({});

  const getInputValue = ({ name, value }) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetInputValues = () => {
    setInputValues({});
  };

  return { inputValues, getInputValue, resetInputValues };
};
export default useGetValueFromTextInput;
