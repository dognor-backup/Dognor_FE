import { TableHeader, TableHeadText } from "./TableStyle";

export function TableHead() {
  return (
    <TableHeader>
      <tr>
        <TableHeadText padding="20px" scope="col" />
        <TableHeadText padding="20px" scope="col">
          No.
        </TableHeadText>
        <TableHeadText scope="col" padding="auto" style={{ width: "100%" }}>
          제목
        </TableHeadText>
        <TableHeadText padding="45px" scope="col">
          작성자
        </TableHeadText>
        <TableHeadText padding="35px" scope="col">
          작성일
        </TableHeadText>
        <TableHeadText padding="23px" scope="col">
          조회
        </TableHeadText>
      </tr>
    </TableHeader>
  );
}
