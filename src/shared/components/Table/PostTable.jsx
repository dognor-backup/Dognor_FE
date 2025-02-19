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

export function PostTable({
  data = [],
  selectedPosts,
  setSelectedPosts,
  emptyMessage = "게시글이 없습니다.",
}) {
  const handleCheckboxChange = (postSeq) => {
    setSelectedPosts((prev) =>
      prev.includes(postSeq)
        ? prev.filter((id) => id !== postSeq)
        : [...prev, postSeq]
    );
  };

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
              <TableRow key={item.writeDt || index}>
                <SmallTableCell>
                  <SelectableCheckbox
                    name={item.writeDt}
                    checked={selectedPosts.includes(item.writeDt)}
                    onChange={() => handleCheckboxChange(item.writeDt)}
                  />
                </SmallTableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <SmallTableCell>{item.division || "미정"}</SmallTableCell>
                <SmallTableCell>{item.categoryName || "없음"}</SmallTableCell>
                <SmallTableCell>
                  {formatDate(item.writeDt) || "날짜 없음"}
                </SmallTableCell>
                <SmallTableCell>{item.hitCnt ?? 0}</SmallTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center" height={"40px"}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
}
