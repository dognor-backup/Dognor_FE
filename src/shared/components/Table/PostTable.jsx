import { formatDate } from "@/shared/utils/formatDate";
import Checkbox from "../checkbox/Checkbox";
import VerticalDotsSelect from "../VerticalDotsSelect";
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
  return (
    <TableWrapper>
      <StyledTable>
        <TableHeader>
          <TableRow>
            <TableHead width={32}></TableHead>
            <TableHead width={70}>No.</TableHead>
            <TableHead width={354}>제목/내용</TableHead>
            <TableHead width={140}>구분</TableHead>
            <TableHead width={140}>게시판/병원</TableHead>
            <TableHead width={120}>작성일</TableHead>
            <TableHead width={80}>조회</TableHead>
            <TableHead width={40}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.communityPostSeq || index}>
                <SmallTableCell>
                  <Checkbox name={item.title} size={"small"} />
                </SmallTableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <SmallTableCell>{item.categoryName || "미정"}</SmallTableCell>
                <SmallTableCell>{item.categoryName || "없음"}</SmallTableCell>
                <SmallTableCell>
                  {formatDate(item.firstSaveDt) || "날짜 없음"}
                </SmallTableCell>
                <SmallTableCell>{item.hitCnt ?? 0}</SmallTableCell>
                <SmallTableCell>
                  <VerticalDotsSelect />
                </SmallTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
}
