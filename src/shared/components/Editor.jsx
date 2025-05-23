import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);
import { useConvetImg } from "@/domains/post/hooks/useConvertImg";
import styled from "@emotion/styled";
import "react-quill/dist/quill.snow.css";
import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { InputForm } from "@/shared/components/input/InputForm";
import useGetValueFromTextInput from "../hooks/useGetValueFromTextInput";

function ReactQuillEditor({ children, getEditorText, title, content: PrevContent }) {
  const { inputValues, getInputValue } = useGetValueFromTextInput();
  const [content, setContent] = useState(PrevContent || "");
  const quillRef = useRef(null);
  let quillObj = quillRef.current?.getEditor();
  const range = quillObj?.getSelection();
  const { mutate } = useConvetImg(quillObj, range);
  const [titleValue, setTitleValue] = useState(title || "");
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
  const onChagecontent = (content) => {
    setContent(content);
    getEditorText({ content, title: titleValue, ...inputValues });
  };

  function ImageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          mutate(formData);
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
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </InputContainer>
        <EditorContainer>
          <ReactQuill
            ref={quillRef}
            style={{ width: "100%", height: "600px", boxSizing: "borderbox" }}
            modules={modules}
            onChange={onChagecontent}
            value={content}
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
  width: calc(100% - 172px);
`;
const InputContainer = styled.div`
  width: calc(100% - 172px);
  margin: 0 auto;
`;
