import { TableWrapper, StyledTable, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./BaseTable";

export function CommentTable({ data = [], emptyMessage = "댓글이 없습니다." }) {
  const headers = ["No.", "댓글 내용", "작성자", "작성일", "좋아요"];

  return (
    <TableWrapper>
      <StyledTable>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.commentSeq || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.content}</TableCell> {/* 댓글 내용 */}
                <TableCell>{item.author || "익명"}</TableCell> {/* 작성자 */}
                <TableCell>{item.createdAt || "날짜 없음"}</TableCell> {/* 작성일 */}
                <TableCell>{item.likeCount ?? 0}</TableCell> {/* 좋아요 */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
}
