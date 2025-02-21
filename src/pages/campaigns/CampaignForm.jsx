import { Button } from "@/shared/components/buttons/Button";
import ReactQuillEditor from "@/shared/components/Editor";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { InputForm } from "@/shared/components/input/InputForm";
import { InputBtn } from "@/shared/components/input/InputBtn";
import { DatePicker } from "@/shared/components/DatePicker";
import { SelectBox } from "@/shared/components/dropbox/SelectBox";
import { useMutation } from "@tanstack/react-query";
import { saveCampaign } from "@/domains/campaign/api/campaign";
import { formatDate } from "./hooks/formatDate";
import { useNavigate } from "react-router-dom";

export function CampaignForm() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({
    title: "",
    detail: "",
    strDate: "",
    endDate: "",
    keyword1: "",
    keyword2: "",
    keyword3: "",
  });
  const navigate = useNavigate();
  const getEditorText = ({ title, content }) => {
    setPost((prev) => ({ ...prev, title, detail: content }));
  };
  const [fileName, setFileName] = useState("");
  const getInputValue = ({ name, value }) => {
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const campaign = ["캠페인"];

  const handleOpenFile = (e) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = () => {
    if (fileInputRef.current?.files?.length > 0) {
      setFileName(fileInputRef.current.files[0].name);
    }
  };
  const getValueFromSelect = () => {};

  const handleUpdateCampaign = useMutation({
    mutationFn: saveCampaign,
    onSuccess: ({ success }) => {
      if (success) {
        navigate("/campaigns");
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imgFile", fileInputRef.current.files[0]);
    for (const key in post) {
      if (post[key]) {
        formData.append(key, post[key]);
      }
    }
    handleUpdateCampaign.mutate(formData);
  };

  const getStartDate = (date) => {
    const strDate = formatDate(date);
    setPost((prev) => ({ ...prev, strDate }));
  };
  const getEndDate = (date) => {
    const endDate = formatDate(date);
    setPost((prev) => ({ ...prev, endDate }));
  };

  return (
    <form onSubmit={handleSubmit} id="campaignForm">
      <PageWrapper>
        <PageTop>
          <h2>캠페인 등록하기</h2>
          <span>캠페인에 관하여 상세하게 작성해 주세요</span>
        </PageTop>
        <CampaignContainer>
          <Flex mgBtm="14px">
            <InputContainer>
              <SelectBox
                optionList={campaign}
                label="등록할 게시판"
                placeholder={"캠페인"}
                getValueFromSelect={getValueFromSelect}
              />
            </InputContainer>
            <InputContainer onClick={handleOpenFile}>
              <File type="file" id="fileInput" ref={fileInputRef} onChange={handleFileChange} />
              <InputBtn
                id="id"
                name="InputName"
                BtnText="파일 첨부하기"
                placeholder="사진을 등록해주세요"
                label="대표 섬네일"
                infoMessage="파일은 1MB 이내로 해주세요"
                status="normal"
                getInputValue={getInputValue}
                readOnly
                value={fileName}
                style={{ pointerEvents: "auto" }}
              />
            </InputContainer>
          </Flex>
          <Flex mgBtm="14px">
            <DatePicker label="시작일" getSelectedDate={getStartDate}></DatePicker>
            <DatePicker label="종료일" getSelectedDate={getEndDate}></DatePicker>
          </Flex>
          <Flex mgBtm="14px">
            <InputContainer>
              <InputForm
                id="keyword1"
                name="keyword1"
                placeholder="제목을 작성해주세요"
                label="키워드1"
                status="normal"
                getInputValue={getInputValue}
                infoMessage="최소 1개의 키워드는 입력해주세요"
              />
            </InputContainer>
            <InputContainer>
              <InputForm
                id="keyword2"
                name="keyword2"
                placeholder="제목을 작성해주세요"
                label="키워드2"
                status="normal"
                getInputValue={getInputValue}
              />
            </InputContainer>
            <InputContainer>
              <InputForm
                id="keyword3"
                name="keyword3"
                placeholder="제목을 작성해주세요"
                label="키워드3"
                status="normal"
                getInputValue={getInputValue}
              />
            </InputContainer>
          </Flex>
        </CampaignContainer>
      </PageWrapper>

      <ReactQuillEditor getEditorText={getEditorText} title={title} content={content}></ReactQuillEditor>
      <BtnContainer>
        <Button
          type="submit"
          form="campaignForm"
          variant="primary"
          size="medium"
          state="default"
          style={{ width: "320px" }}
        >
          등록하기
        </Button>
      </BtnContainer>
    </form>
  );
}

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 48px;
  margin-bottom: 100px;
`;
const Flex = styled.div(
  ({ mgBtm }) => `
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: ${mgBtm ? mgBtm : 0};
`
);
const InputContainer = styled.div`
  width: 100%;
  height: inherit;
`;
const File = styled.input`
  position: absolute;
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
const CampaignContainer = styled.div`
  margin-top: 48px;
  width: calc(100% - 172px);
`;
