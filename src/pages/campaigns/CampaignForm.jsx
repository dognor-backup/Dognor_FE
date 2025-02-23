import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactQuillEditor from "@/shared/components/Editor";
import { useCampaignMutations } from "./hooks/useCampaignMuations";
import { DatePicker } from "@/shared/components/DatePicker";
import { Button } from "@/shared/components/buttons/Button";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { InputForm } from "@/shared/components/input/InputForm";
import { InputBtn } from "@/shared/components/input/InputBtn";
import { SelectBox } from "@/shared/components/dropbox/SelectBox";
import { formatDate } from "./hooks/formatDate";
import styled from "@emotion/styled";

export function CampaignForm() {
  const location = useLocation();
  const prevPosting = location?.state?.campaignDetail;
  const {
    camPaignSeq,
    detail,
    endDate,
    imgUrl,
    keyword1,
    keyword2,
    keyword3,
    strDate,
    title: prevTitle,
  } = prevPosting || {};
  const { updateCampaignMutation, editCampaignMutation } = useCampaignMutations();
  const [isEditing, setIsEditing] = useState(prevPosting ? true : false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef();
  const campaign = ["캠페인"];

  const [post, setPost] = useState({
    title: "",
    detail: "",
    strDate: "",
    endDate: "",
    keyword1: isEditing ? keyword1 : "",
    keyword2: isEditing ? keyword2 : "",
    keyword3: isEditing ? keyword3 : "",
  });

  useEffect(() => {
    if (location?.state?.campaignDetail) {
      setIsEditing(true);
    }
  }, [isEditing]);

  const getEditorText = ({ title, content }) => setPost((prev) => ({ ...prev, title, detail: content }));
  const getInputValue = ({ name, value }) => setPost((prev) => ({ ...prev, [name]: value }));

  const handleOpenFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = () => {
    if (fileInputRef.current?.files?.length > 0) {
      setFileName(fileInputRef.current.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", fileInputRef.current.files[0]);
    for (const key in post) {
      if (post[key]) {
        formData.append(key, post[key]);
      }
    }
    if (isEditing) {
      formData.append("camPaignSeq", Number(camPaignSeq));
      editCampaignMutation.mutate(formData);
    } else {
      updateCampaignMutation.mutate(formData);
    }
  };

  const getStartDate = (date) => {
    const strDate = formatDate(date);
    setPost((prev) => ({ ...prev, strDate }));
  };
  const getEndDate = (date) => {
    const endDate = formatDate(date);
    setPost((prev) => ({ ...prev, endDate }));
  };
  const getValueFromSelect = () => {};

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
                value={fileName || (isEditing ? imgUrl : "")}
                style={{ pointerEvents: "auto" }}
              />
            </InputContainer>
          </Flex>
          <Flex mgBtm="14px">
            <DatePicker label="시작일" getSelectedDate={getStartDate} selected={strDate}></DatePicker>
            <DatePicker label="종료일" getSelectedDate={getEndDate} selected={endDate}></DatePicker>
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
                value={post.keyword1}
                onChange={(e) => setPost((prev) => ({ ...prev, keyword1: e.target.value }))}
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
                value={post.keyword2}
                onChange={(e) => setPost((prev) => ({ ...prev, keyword2: e.target.value }))}
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
                value={post.keyword3}
                onChange={(e) => setPost((prev) => ({ ...prev, keyword3: e.target.value }))}
              />
            </InputContainer>
          </Flex>
        </CampaignContainer>
      </PageWrapper>

      <ReactQuillEditor getEditorText={getEditorText} title={prevTitle} content={detail}></ReactQuillEditor>
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
