import Checkbox from "../checkbox/Checkbox";
import {
  TableWrapper,
  StyledTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./BaseTable";

export function PostTable({ data = [], emptyMessage = "게시글이 없습니다." }) {
  const headers = ["No.", "제목/내용", "구분", "게시판/병원", "작성일", "조회"];

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
              <TableRow key={item.communityPostSeq || index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell> {/* 제목/내용 */}
                <TableCell>{item.category || "미정"}</TableCell> {/* 구분 */}
                <TableCell>{item.board || "없음"}</TableCell>{" "}
                {/* 게시판/병원 */}
                <TableCell>{item.createdAt || "날짜 없음"}</TableCell>{" "}
                {/* 작성일 */}
                <TableCell>{item.hitCount ?? 0}</TableCell> {/* 조회수 */}
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
