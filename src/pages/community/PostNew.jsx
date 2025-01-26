import { SelectBox } from "./Selectbox";
import { DatePicker } from "./DatePicker";
import styled from "@emotion/styled";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import { Button } from "@/shared/components/buttons/Button";
import { PageTop } from "@/shared/components/layout/PageTopTitle";
import ReactQuillEditor from "@/shared/components/Editor";
import { useState } from "react";
import { usePostContent } from "@/domains/post/hooks/usePostContent";
import useAlertStore from "@/shared/hooks/useAlertStore";
import Alert from "@/shared/components/alert/Alert";

export function PostNew() {
  const { isAlertOpen, openAlert } = useAlertStore();
  const [CommunicationInput, setCommunicationInput] = useState({
    title: "",
    content: "",
    categoryCd: null,
    usageDate: "",
  });
  const [agreePolicy, setAgreePolicy] = useState(false);
  const uploadPostMutation = usePostContent();
  const handleSubmit = (e) => {
    const { title, content, categoryCd } = CommunicationInput;
    e.preventDefault();
    const isNotEmpty = title && content && categoryCd;
    if (!isNotEmpty || !agreePolicy) return openAlert();
    uploadPostMutation.mutate(CommunicationInput);
  };

  const getEditorText = ({ title, content }) => setCommunicationInput((prev) => ({ ...prev, title, content }));

  const getSelectedDate = (date) => {
    const dateForm = date.toISOString();
    const usageDate = dateForm.split("T")[0];
    setCommunicationInput((prev) => ({ ...prev, usageDate }));
  };

  const getValueFromSelect = (categoryCd) => setCommunicationInput((prev) => ({ ...prev, categoryCd: categoryCd }));

  const getCheckValues = () => setAgreePolicy((prev) => !prev);

  return (
    <form onSubmit={handleSubmit}>
      <PageTop>
        <h2>게시글 작성하기</h2>
        <span>다양한 많은 이야기를 작성해주세요</span>
      </PageTop>
      <ReactQuillEditor getEditorText={getEditorText}>
        <SelectBoxes>
          <SelectBox label="등록할 게시판" getValueFromSelect={getValueFromSelect} />
          {CommunicationInput.categoryCd === 5 && (
            <DatePicker label="혈액이 필요한 날짜" color="red" getSelectedDate={getSelectedDate} />
          )}
        </SelectBoxes>
      </ReactQuillEditor>
      <FlexCenter style={{ paddingTop: "48px" }}>
        <Checkbox
          name="agree"
          label={
            <>
              현재의 게시글 설정 정보를 확인하였으며, 해당 설정이 추후 운영자에 의해 변경될 수 있음에 동의합니다.
              <br />
              게시중단 통지를 받는 것과 재게시 요청은 운영자만 가능함에 동의합니다.
            </>
          }
          weight="regular"
          onChange={getCheckValues}
          checked={agreePolicy}
        />
        <BtnCover>
          <Button variant="primary" size="medium" state="default" style={{ width: "320px" }}>
            게시글 등록하기
          </Button>
        </BtnCover>
      </FlexCenter>
      <Alert isAlertOpen={isAlertOpen}> {<>내용을 모두 입력해 주세요</>} </Alert>;
    </form>
  );
}

const SelectBoxes = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: flex-end;
  gap: 10px;
  margin-top: 64px;
`;

const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BtnCover = styled.div`
  margin-top: 48px;
  margin-bottom: 100px;
`;
