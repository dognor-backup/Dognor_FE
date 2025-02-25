import { Button } from "@/shared/components/buttons/Button";
import { DatePicker } from "@/shared/components/DatePicker";
import { InputBtn } from "@/shared/components/input/InputBtn";
import { InputForm } from "@/shared/components/input/InputForm";
import styled from "@emotion/styled";
import { useRef } from "react";
export function SettingBanner() {
  const fileInputRef = useRef();

  const getInputValue = ({ name, value }) => {
    console.log(name, value);
  };
  const handleOpenFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = () => {
    // if (fileInputRef.current?.files?.length > 0) {
    //   setFileName(fileInputRef.current.files[0].name);
    // }
  };
  /* {
  "webImgFile": "string",
  "mobileImgFile": "string",
  "link": "https://domain.com",
  "strDate": "2024-12-12",
  "endDate": "2024-12-12",
  "memo": "text"
} */
  return (
    <InputWrapper>
      <span>1</span>
      <InputContainer>
        <Flex>
          <File type="file" id="fileInput" ref={fileInputRef} onChange={handleFileChange} />
          <InputBtn
            id="title"
            name="title"
            placeholder="사진을 등록해주세요"
            label="이미지 첨부(Web)"
            status="normal"
            BtnText="파일 첨부하기"
            getInputValue={getInputValue}
            infoMessage="1920*480 비율, 파일은 1MB 이내로 해주세요"
            readOnly
            onClick={handleOpenFile}
            //   value={titleValue}
            //   onChange={(e) => setTitleValue(e.target.value)}
          />
          <InputForm
            id="title"
            name="title"
            placeholder="링크를 입력해주세요"
            label="링크"
            status="normal"
            getInputValue={getInputValue}
          />
        </Flex>
        <Flex>
          <InputBtn
            id="title"
            name="title"
            placeholder="사진을 등록해주세요"
            label="이미지 첨부(Web)"
            status="normal"
            BtnText="파일 첨부하기"
            getInputValue={getInputValue}
            infoMessage="1920*480 비율, 파일은 1MB 이내로 해주세요"
            //   value={titleValue}
            //   onChange={(e) => setTitleValue(e.target.value)}
          />
          <DatePicker label="시작일" />
        </Flex>
        <Flex>
          <InputForm
            id="title"
            name="title"
            placeholder="링크를 입력해주세요"
            label="링크"
            status="normal"
            getInputValue={getInputValue}
          />
          <DatePicker label="종료일" />
        </Flex>
      </InputContainer>
      <BtnsContainer>
        <Button variant="normal" size="small" state="outline">
          저장
        </Button>
        <Button variant="normal" size="small" state="outline">
          삭제
        </Button>
      </BtnsContainer>
    </InputWrapper>
  );
}

const InputWrapper = styled.article`
  display: flex;
  align-items: center;
`;
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const InputContainer = styled.div``;
const File = styled.input`
  position: absolute;
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
const BtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: flex-start;
`;
