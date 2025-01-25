import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);
import styled from "@emotion/styled";

import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { InputForm } from "@/shared/components/input/InputForm";
import useGetValueFromTextInput from "../hooks/useGetValueFromTextInput";
import { usePost } from "@/domains/post/hooks/usePost";

function ReactQuillEditor({ children, getEditorText }) {
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const [content, setContent] = useState("");
  const [getImgURL, setImgUrl] = useState({ msg: "", code: null, data: "", totalPage: null });
  const quillRef = useRef(null);
  const { mutate } = usePost(setImgUrl);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: {
          image: ImageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
  );
  const onChagecontent = (e) => {
    setContent(e);
    getEditorText({ content, ...inputValues });
  };

  function ImageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;
      if (file) {
        // console.log(quillRef);
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        console.log("FormData에서 'image' 키의 값:", formData.get("data"));

        /*에디터 정보를 가져온다.*/
        let quillObj = quillRef.current?.getEditor();
        const range = quillObj?.getSelection();

        try {
          mutate(formData);
          console.log(getImgURL);
          // const imgUrl = res.data;
          /*에디터의 커서 위치에 이미지 요소를 넣어준다.*/
          // quillObj?.insertEmbed(range.index, "image", `${imgUrl}`);
        } catch (error) {
          return error;
        }
      }
    };
  }
  return (
    <form>
      <PageWrapper>
        <InputContainer>
          {children}
          <InputForm
            id="title"
            name="title"
            placeholder="제목을 작성해주세요"
            label="게시글 제목"
            status="normal"
            getInputValue={getInputValue}
          />
        </InputContainer>
        <EditorContainer>
          <ReactQuill
            ref={quillRef}
            style={{ width: "100%", height: "600px", boxSizing: "borderbox" }}
            modules={modules}
            onChange={onChagecontent}
          />
        </EditorContainer>
      </PageWrapper>
    </form>
  );
}
export default ReactQuillEditor;
const EditorContainer = styled.div`
  margin-bottom: 48px;
  margin-top: 48px;
`;
const InputContainer = styled.div`
  width: calc(100% - 172px);
  margin: 0 auto;

  /* margin-top: 48px; */
`;
