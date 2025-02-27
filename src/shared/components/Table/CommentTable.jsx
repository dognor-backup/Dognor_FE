import { formatDate } from "@/shared/utils/formatDate";
import {
  TableWrapper,
  StyledTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  SmallTableCell,
} from "./baseTable";
import SelectableCheckbox from "./SelectableCheckbox";
import VerticalDotsSelect from "@/shared/components/VerticalDotsSelect";

export function CommentTable({
  data = [],
  selectedComments = [],
  handleCheckboxChange,
  handleEdit,
  handleDelete,
  emptyMessage = "댓글/리뷰가 없습니다.",
}) {
  return (
    <TableWrapper>
      <StyledTable>
        <TableHeader>
          <TableRow>
            <TableHead width={32}></TableHead>
            <TableHead width={70}>No.</TableHead>
            <TableHead width={434}>댓글/리뷰</TableHead>
            <TableHead width={140}>구분</TableHead>
            <TableHead width={140}>게시판</TableHead>
            <TableHead width={120}>작성일</TableHead>
            <TableHead width={40}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.seq || index}>
                <SmallTableCell>
                  <SelectableCheckbox
                    name={`comment-${item.seq}`}
                    checked={selectedComments.some(
                      (comment) => comment.seq === item.seq
                    )}
                    onChange={() => handleCheckboxChange(item.seq)}
                  />
                </SmallTableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.content}</TableCell>
                <SmallTableCell>{item.division || "미정"}</SmallTableCell>
                <SmallTableCell>{item.categoryName || "없음"}</SmallTableCell>
                <SmallTableCell>
                  {formatDate(item.writeDt) || "날짜 없음"}
                </SmallTableCell>
                <SmallTableCell></SmallTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center" height={"40px"}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
}
