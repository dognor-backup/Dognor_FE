import Checkbox from "@/shared/components/checkbox/Checkbox";
import ReactQuillEditor from "@/shared/components/Editor";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";

import { SelectBox } from "./Selectbox";
import { InputForm } from "@/shared/components/input/InputForm";
import { DatePicker } from "./DatePicker";

export function PostForm() {
  const getInputValue = (e) => {
    console.log(e);
  };
  return (
    <PageWrapper>
      <PageTop>
        <h2>게시글 작성하기</h2>
        <span>다양한 많은 이야기를 작성해주세요</span>
      </PageTop>
      <InputContainer>
        <SelectBoxes>
          <SelectBox label="등록할 게시판" color="#F64D4D" />
          <DatePicker />
        </SelectBoxes>
        <InputForm
          id="id"
          name="InputName"
          placeholder="제목을 작성해주세요"
          label="게시글 제목"
          status="normal"
          getInputValue={getInputValue}
        />
      </InputContainer>
      <ReactQuillEditor />
      <div>
        <Checkbox
          name="agree"
          label={
            <>
              "현재의 게시글 설정 정보를 확인하였으며, 해당 설정이 추후 운영자에 의해 변경될 수 있음에 동의합니다.
              <br />
              게시중단 통지를 받는 것과 재게시 요청은 운영자만 가능함에 동의합니다."
            </>
          }
          weight="regular"
        />
      </div>
    </PageWrapper>
  );
}

const InputContainer = styled.div`
  width: calc(100% - 172px);
  margin: 0 auto;
  margin-top: 48px;
`;
const SelectBoxes = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: flex-end;
  gap: 10px;
`;
