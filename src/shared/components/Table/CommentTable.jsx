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
import { formatDate } from "@/shared/utils/formatDate";

export function CommentTable({
  data = [],
  emptyMessage = "댓글/리뷰가 없습니다.",
}) {
  return (
    <TableWrapper>
      <StyledTable>
        <TableHeader>
          <TableRow>
            <TableHead width={70}>No.</TableHead>
            <TableHead width={354}>댓글/리뷰</TableHead>
            <TableHead width={140}>구분</TableHead>
            <TableHead width={140}>게시판</TableHead>
            <TableHead width={120}>작성일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.seq || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.content}</TableCell>
                <SmallTableCell>{item.division || "미정"}</SmallTableCell>
                <SmallTableCell>{item.categoryName || "없음"}</SmallTableCell>
                <SmallTableCell>
                  {formatDate(item.writeDt) || "날짜 없음"}
                </SmallTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center" height={"40px"}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
}