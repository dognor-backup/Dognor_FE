import { TableHeader, TableHeadText } from "../../../shared/components/table/TableStyle";
export function CoTableHeader({ currentPath }) {
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
        {currentPath === "all" ? (
          <TableHeadText padding="35px" scope="col">
            커뮤니티
          </TableHeadText>
        ) : null}
        {currentPath === "needbloods" ? (
          <TableHeadText padding="28px" scope="col" style={{ color: "#F64D4D" }}>
            사용 예정일
          </TableHeadText>
        ) : null}
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

export function NoTableHeader() {
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
