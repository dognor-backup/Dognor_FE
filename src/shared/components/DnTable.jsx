import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DnTable({
  data = [],
  emptyMessage = "데이터가 없습니다.",
  secondHeader = "제목",
}) {
  const headers = ["No.", secondHeader, "게시판", "작성일", "조회"];

  return (
    <Table>
      {data.length > 0 && <TableCaption>데이터 목록</TableCaption>} 
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className={index === headers.length - 1 ? "text-right" : ""}>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={item.communityPostSeq || index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.title}</TableCell> 
              <TableCell>{item.category || "미정"}</TableCell> 
              <TableCell>{item.createdAt || "날짜 없음"}</TableCell> 
              <TableCell className="text-right">{item.hitCount ?? 0}</TableCell> 
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center py-4">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
