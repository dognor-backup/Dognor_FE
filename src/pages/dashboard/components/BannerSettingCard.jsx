import { Button } from "@/shared/components/buttons/Button";
import { DatePicker } from "@/shared/components/DatePicker";
import { InputBtn } from "@/shared/components/input/InputBtn";
import { InputForm } from "@/shared/components/input/InputForm";
import { formatDate } from "@/shared/utils/formatDate";
import styled from "@emotion/styled";
import { useRef, useState } from "react";

export function BannerSettingCard({ img, setBannerData }) {
  const [fileName, setFileName] = useState({ webImgFile: "", mobileImgFile: "" });
  const webFileInput = useRef();
  const mobileFileInput = useRef();
  const BannerImg = img;

  const getInputValue = ({ name, value }) => {
    setBannerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenFile = (type) => {
    if (type === "webImgFile" && webFileInput.current) {
      return webFileInput.current.click();
    }
    if (type === "mobileImgFile" && mobileFileInput.current) {
      return mobileFileInput.current.click();
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFileName((prev) => ({ ...prev, [type]: file.name }));
      setBannerData((prev) => ({ ...prev, [type]: file }));
    }
  };

  const getStrDate = (date) => {
    const { formattedDate } = formatDate(date);
    const strDate = formattedDate;
    setBannerData((prev) => ({ ...prev, strDate }));
  };

  const getEndDate = (date) => {
    const { formattedDate } = formatDate(date);
    const endDate = formattedDate;
    setBannerData((prev) => ({ ...prev, endDate }));
  };

  return (
    <InputWrapper>
      <BannerImg />
      <InputContainer>
        <Flex>
          <File type="file" id="webFile" ref={webFileInput} onChange={(e) => handleFileChange(e, "webImgFile")} />
          <InputBtn
            id="webImgFile"
            name="webImgFile"
            placeholder="사진을 등록해주세요"
            label="이미지 첨부(Web)"
            status="normal"
            BtnText="파일 첨부하기"
            getInputValue={getInputValue}
            infoMessage="1920*480 비율, 파일은 1MB 이내로 해주세요"
            readOnly
            onClick={() => handleOpenFile("webImgFile")}
            className="w100"
            value={fileName.webImgFile}
            //   onChange={(e) => setTitleValue(e.target.value)}
          />

          <Right>
            <InputForm
              id="link"
              name="link"
              placeholder="링크를 입력해주세요"
              label="링크"
              status="normal"
              getInputValue={getInputValue}
            />
          </Right>
        </Flex>
        <Flex className="mgTop20">
          <File
            type="file"
            id="mobileFile"
            ref={mobileFileInput}
            onChange={(e) => handleFileChange(e, "mobileImgFile")}
          />
          <InputBtn
            id="mobileImgFile"
            name="mobileImgFile"
            placeholder="사진을 등록해주세요"
            label="이미지 첨부(Mobile)"
            status="normal"
            BtnText="파일 첨부하기"
            getInputValue={getInputValue}
            infoMessage="800*370 비율, 파일은 1MB 이내로 해주세요"
            onClick={() => handleOpenFile("mobileImgFile")}
            className="w100"
            readOnly
            value={fileName.mobileImgFile}
            //   onChange={(e) => setTitleValue(e.target.value)}
          />
          <Right>
            <DatePicker label="시작일" getSelectedDate={getStrDate} />
          </Right>
        </Flex>
        <Flex className="mgTop20">
          <InputForm
            id="memo"
            name="memo"
            placeholder="설명을 작성해주세요"
            label="배너설명"
            status="normal"
            getInputValue={getInputValue}
            className="w100"
            max-length="500"
          />
          <Right>
            <DatePicker label="종료일" getSelectedDate={getEndDate} />
          </Right>
        </Flex>
      </InputContainer>
      <BtnsContainer>
        <Button variant="normal" size="small" state="outline" type="submit" form="bannerForm">
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
  justify-content: space-between;
  width: 100%;
  gap: 16px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`
);
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const Right = styled.div`
  width: 240px;
  max-width: 240px;
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
