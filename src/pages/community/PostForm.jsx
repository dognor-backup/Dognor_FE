import Checkbox from "@/shared/components/checkbox/Checkbox";
import ReactQuillEditor from "@/shared/components/Editor";
import { PageTop, PageWrapper } from "@/shared/components/layout/PageTopTitle";
import styled from "@emotion/styled";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PostForm() {
  return (
    <PageWrapper>
      <PageTop>
        <h2>게시글 작성하기</h2>
        <span>다양한 많은 이야기를 작성해주세요</span>
      </PageTop>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
