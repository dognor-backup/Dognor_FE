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
  padding: 16px 16px; /* 바디 행 전체에 적용되는 패딩 */
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  }
`;

export const TableHead = styled.th`
  padding: 8px 48px 8px 56px; /* 헤더 패딩 */
  text-align: center; /* 헤더 가운데 정렬 */
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  background-color: ${({ theme }) => theme.colors.neutrals_08};
`;

export const TableBody = styled.tbody``;

/* 일반적인 셀 (8px 16px) */
export const TableCell = styled.td`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
`;

/* 작은 셀 (8px) */
export const SmallTableCell = styled.td`
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals_05};
`;
