import Checkbox from "../checkbox/Checkbox";
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
                <SmallTableCell>
                  <Checkbox name={"selectBox"} size={"small"} />
                </SmallTableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell> {/* 제목/내용 */}
                <SmallTableCell>{item.category || "미정"}</SmallTableCell>{" "}
                {/* 구분 */}
                <SmallTableCell>{item.board || "없음"}</SmallTableCell>{" "}
                {/* 게시판/병원 */}
                <SmallTableCell>
                  {item.createdAt || "날짜 없음"}
                </SmallTableCell>{" "}
                {/* 작성일 */}
                <SmallTableCell>{item.hitCount ?? 0}</SmallTableCell>{" "}
                {/* 조회수 */}
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
