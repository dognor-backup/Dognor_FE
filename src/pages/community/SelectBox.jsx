import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SelectBox({ label, color }) {
  return (
    <SelectContainer>
      <BoxLabel>{label}</BoxLabel>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="게시판을 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">자유게시판</SelectItem>
          <SelectItem value="dark">병원 헌혈 후기</SelectItem>
          <SelectItem value="system">질문있어요</SelectItem>
          <SelectItem value="system">고마워요</SelectItem>
          <SelectItem value="system">혈액이 필요해요</SelectItem>
        </SelectContent>
      </Select>
    </SelectContainer>
  );
}
import styled from "@emotion/styled";

const BoxLabel = styled.span(
  ({ theme }) => `
    font-size: 16px;
    font-weight: 700;
    display: inline-block;
    margin-bottom: 10px;
    color: ${theme.colors.neutrals01};
  `
);
const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
