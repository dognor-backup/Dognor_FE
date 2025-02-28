import styled from "@emotion/styled";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

export const TableHeader = styled.thead`
  border-top: 1px solid ${({ theme }) => theme.colors.neutrals_04};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_04};
`;

export const TableRow = styled.tr`
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  }
`;

export const TableHead = styled.th`
  padding: 16px 16px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  background-color: ${({ theme }) => theme.colors.neutrals_08};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ width }) => width && `width: ${width}px;`}
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 0 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ width }) => width && `width: ${width}px;`}
`;

export const SmallTableCell = styled.td`
  padding: 8px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ width }) => width && `width: ${width}px;`}
`;
