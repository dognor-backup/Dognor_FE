import { useRef } from "react";
import { Flex, Input, Label, Info } from "./inputStyle"; 
import { Button } from "../buttons/Button";

export const InputFile = ({
  labelText = "사진을 등록해주세요",
  buttonText = "파일 첨부하기",
  onFileChange,
  infoMessage = "파일을 업로드해주세요.",
  status = "normal",
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (onFileChange) onFileChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* Label */}
      <Label htmlFor="file-upload">{labelText}</Label>

      {/* Flex: Input과 Button을 정렬 */}
      <Flex>
        <Input
          type="text"
          id="file-upload-text"
          name="file-upload-text"
          placeholder={labelText}
          readOnly
          onClick={handleButtonClick} // Input 클릭 시 파일 선택 창 열기
        />
        <Button type="button" variant="normal" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </Flex>

      {/* Info: 설명 메시지 */}
      <Info status={status}>{infoMessage}</Info>

      {/* 숨겨진 파일 Input */}
      <input
        type="file"
        id="file-upload"
        name="file-upload"
        style={{ display: "none" }} // 숨김 처리
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};
