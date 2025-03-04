import styled from "@emotion/styled";
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
  margin-bottom: 6px;
  width: 100%;
`;
