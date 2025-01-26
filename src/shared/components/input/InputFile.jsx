import { useRef, useState } from "react";
import { Flex, Input, Label, Info, Layout } from "./inputStyle";
import { Button } from "../buttons/Button";

export const InputFile = ({
  labelText = "사진을 등록해주세요",
  buttonText = "파일 첨부하기",
  onFileChange,
  infoMessage = "파일을 업로드해주세요.",
  status = "normal",
  placeholder = "파일을 선택해주세요",
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(""); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); 
      if (onFileChange) onFileChange(file); 
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); 
  };

  return (
    <Layout>
      <Label htmlFor="file-upload">{labelText}</Label>
      <Flex>
        <Input
          type="text"
          id="file-upload-text"
          name="file-upload-text"
          placeholder={placeholder}
          readOnly
          value={fileName} 
          onClick={handleButtonClick}
          style={{ cursor: "pointer" }}
        />
        <Button type="button" variant="normal" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </Flex>
      <Info status={status}>{infoMessage}</Info>
      <input
        type="file"
        id="file-upload"
        name="file-upload"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Layout>
  );
};
