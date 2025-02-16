import styled from "@emotion/styled";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  padding: 8px 48px 8px 56px;
  text-align: left;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  background-color: ${({ theme }) => theme.colors.neutrals_08};
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: ${({ isHeader }) => (isHeader ? "8px 16px" : "0 16px")};
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  border-bottom: ${({ isLast }) =>
    isLast ? "none" : "1px solid ${({ theme }) => theme.colors.neutrals_05};"};
`;
