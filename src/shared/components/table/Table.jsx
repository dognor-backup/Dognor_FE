import styled from "@emotion/styled";
export function Table() {
  return (
    <TableContainer>
      <TableHeader>
        <tr>
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
      <tbody>
        <BdBtm>
          <TableBodyText></TableBodyText>
          <TableBodyText bold="700">
            <span></span>
          </TableBodyText>
          <TableBodyText align="left">
            <TextMg>title</TextMg>
          </TableBodyText>
          <TableBodyText>firstSaveUser</TableBodyText>
          <TableBodyText>firstSaveDt</TableBodyText>
        </BdBtm>
      </tbody>
    </TableContainer>
  );
}

export const TableContainer = styled.table`
  width: 100%;
`;
export const TableHeader = styled.thead(
  ({ theme }) => `
  width: 100%;
  white-space: nowrap;
  border-top: 1px solid ${theme.colors.neutrals_04};
  border-bottom: 1px solid ${theme.colors.neutrals_04};
  margin-bottom: 10px
`
);
export const TableHeadText = styled.th(
  ({ padding }) => `
  padding: 16px ${padding};
  font-size: 18px;
  font-weight: 700
`
);
export const TableBodyText = styled.td(
  ({ align, bold, pdtop }) => `
  text-align: ${align ? align : "center"};
  padding: 0;
  height: 40px;
  font-size: 14px;
  vertical-align: middle;
  font-weight: ${bold ? bold : "400"};
  line-height: 24px;
  position: relative;
  padding-top: ${pdtop};
`
);
export const BdBtm = styled.tr(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.colors.neutrals_05};
`
);
export const TextMg = styled.span`
  margin: 0 16px;
`;
export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;
