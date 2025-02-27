import { useState } from "react";
import ReactQuillEditor from "@/shared/components/Editor";
import { useEditPost, usePostContent } from "@/domains/post/hooks/usePostContent";
import useAlertStore from "@/shared/hooks/useAlertStore";
import Alert from "@/shared/components/alert/Alert";
import { DatePicker } from "../../shared/components/DatePicker";
import styled from "@emotion/styled";
import Checkbox from "@/shared/components/checkbox/Checkbox";
import { Button } from "@/shared/components/buttons/Button";
import { PageTop } from "@/shared/components/layout/PageTopTitle";
import { SelectBox } from "./components/SelectBox";
import { useGetUserId } from "../../domains/auth/hooks/useGetUserId";
import { useLocation } from "react-router-dom";

export function PostForm() {
  const location = useLocation();
  const post = location.state || {};
  const { postSeq, title, content, categoryCd, usageDate } = post;
  const [isEditing, setIsEditing] = useState(() => Object.keys(post).length > 0);
  const { userRole } = useGetUserId() || {};
  const isAdmin = userRole === "ADMIN";
  const { isAlertOpen, openAlert } = useAlertStore();
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [CommunicationInput, setCommunicationInput] = useState({
    title: "",
    content: "",
    categoryCd: isEditing ? categoryCd : null,
    usageDate: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(isEditing ? categoryCd : "");

  const categoryList = isAdmin
    ? [{ name: "공지사항", code: 1, path: "" }]
    : [
        { name: "자유게시판", code: 2, path: "free" },
        { name: "병원 헌혈 후기", code: 3, path: "review" },
        { name: "질문있어요", code: 4, path: "question" },
        { name: "고마워요", code: 5, path: "thanks" },
        { name: "혈액이 필요해요", code: 6, path: "needbloods" },
      ];
  const [targetPath, setTargetPath] = useState(isEditing && categoryList.find((el) => el.code == categoryCd).path);
  const uploadPostMutation = usePostContent(targetPath);
  const editPostMutation = useEditPost(targetPath);

  const handleSubmit = (e) => {
    let isNotEmpty;
    const { title, content, categoryCd, usageDate } = CommunicationInput;
    e.preventDefault();
    if (categoryCd != 6) {
      isNotEmpty = title && content && categoryCd;
    } else {
      isNotEmpty = title && content && categoryCd && usageDate;
    }
    if (!isNotEmpty || !agreePolicy) return openAlert();
    if (isEditing) {
      CommunicationInput.postSeq = postSeq;
      editPostMutation.mutate(CommunicationInput);
    } else {
      uploadPostMutation.mutate(CommunicationInput);
    }
  };
  const getEditorText = ({ title, content }) => {
    setCommunicationInput((prev) => ({ ...prev, title, content }));
  };

  const getSelectedDate = (date) => {
    const selectedDate = new Date(date);
    const dateForm = selectedDate.toISOString();
    const usageDate = dateForm.split("T")[0];
    setCommunicationInput((prev) => ({ ...prev, usageDate }));
  };
  const getValueFromSelect = (categoryCd) => {
    setCommunicationInput((prev) => ({ ...prev, categoryCd: Number(categoryCd) }));
    setSelectedCategory(categoryList.find((el) => el.code == categoryCd).code?.toString());
    setTargetPath(categoryList.find((el) => el.code == categoryCd).path);
  };

  const getCheckValues = () => setAgreePolicy((prev) => !prev);

  return (
    <form onSubmit={handleSubmit}>
      <PageTop>
        <h2>{isEditing ? "게시글 수정하기" : "게시글 작성하기"}</h2>
        <span>다양한 많은 이야기를 작성해주세요</span>
      </PageTop>
      <ReactQuillEditor getEditorText={getEditorText} title={title} content={content}>
        <SelectBoxes>
          <SelectBox
            optionList={categoryList}
            label="등록할 게시판"
            getValueFromSelect={getValueFromSelect}
            value={isEditing ? selectedCategory.toString() : selectedCategory}
            placeholder="게시판을 선택해주세요"
          />
          {CommunicationInput.categoryCd === 6 && (
            <DatePicker label="혈액이 필요한 날짜" color="red" getSelectedDate={getSelectedDate} selected={usageDate} />
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
          {!isEditing && (
            <Button variant="primary" size="medium" state="default" style={{ width: "320px" }}>
              게시글 등록하기
            </Button>
          )}
          {isEditing && (
            <Button variant="primary" size="medium" state="default" style={{ width: "320px" }}>
              수정하기
            </Button>
          )}
        </BtnCover>
      </FlexCenter>
      <Alert isAlertOpen={isAlertOpen}> {<>내용을 모두 입력해 주세요</>} </Alert>
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
