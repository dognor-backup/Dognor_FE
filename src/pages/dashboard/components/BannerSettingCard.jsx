import { Button } from "@/shared/components/buttons/Button";
import { DatePicker } from "@/shared/components/DatePicker";
import { InputBtn } from "@/shared/components/input/InputBtn";
import { InputForm } from "@/shared/components/input/InputForm";
import styled from "@emotion/styled";
import { useRef } from "react";

export function BannerSettingCard({ img }) {
  const fileInputRef = useRef();
  const BannerImg = img;
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
  console.log("ss", img);
  return (
    <InputWrapper>
      <BannerImg />

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
            className="w100"

            //   value={titleValue}
            //   onChange={(e) => setTitleValue(e.target.value)}
          />

          <Right>
            <InputForm
              id="title"
              name="title"
              placeholder="링크를 입력해주세요"
              label="링크"
              status="normal"
              getInputValue={getInputValue}
            />
          </Right>
        </Flex>
        <Flex className="mgTop20">
          <InputBtn
            id="title"
            name="title"
            placeholder="사진을 등록해주세요"
            label="이미지 첨부(Web)"
            status="normal"
            BtnText="파일 첨부하기"
            getInputValue={getInputValue}
            infoMessage="1920*480 비율, 파일은 1MB 이내로 해주세요"
            className="w100"
            //   value={titleValue}
            //   onChange={(e) => setTitleValue(e.target.value)}
          />
          <Right>
            <DatePicker label="시작일" />
          </Right>
        </Flex>
        <Flex className="mgTop20">
          <InputForm
            id="title"
            name="title"
            placeholder="링크를 입력해주세요"
            label="링크"
            status="normal"
            getInputValue={getInputValue}
            className="w100"
          />
          <Right>
            <DatePicker label="종료일" />
          </Right>
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

const InputWrapper = styled.article(
  ({ theme }) => `
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.neutrals_04};
  padding: 16px;
  border-radius:16px;
  margin-bottom: 24px;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`
);
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const Right = styled.div`
  width: 240px;
`;

const InputContainer = styled.div`
  width: 100%;
`;
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
