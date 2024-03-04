import styled from "styled-components";

interface TableSectionWrapperProps {}

export const TableSectionWrapper = styled.table<TableSectionWrapperProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-x: auto;
`;

export const TableSectionThead = styled.thead``;

export const TableSectionTbody = styled.tbody``;

export const TableSectionTr = styled.tr``;

export const TableSectionTh = styled.th`
  background-color: ${({ theme }) => theme.colors.gray};
`;

export const TableSectionTd = styled.td`
  min-width: 200px;
`;
