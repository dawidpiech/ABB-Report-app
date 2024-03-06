import styled from "styled-components";

interface TableSectionTrProps {
  $background: boolean;
}

interface TableSectionTdProps {
  $textalign?: string | undefined;
}

export const TableSectionWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 5px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    box-shadow: inset 0 0 2px ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: red;
    border-radius: 10px;
  }
`;

export const TableSectionTable = styled.table`
  border: 1px ${({ theme }) => theme.colors.lightGray} solid;
`;

export const TableSectionThead = styled.thead``;

export const TableSectionTbody = styled.tbody``;

export const TableSectionTr = styled.tr<TableSectionTrProps>`
  background-color: ${(props) =>
    props.$background
      ? ({ theme }) => theme.colors.lightGray
      : ({ theme }) => theme.colors.white};
  font-size: 0.92rem;
`;

export const TableSectionTh = styled.th`
  min-width: 150px;
  padding: 5px 10px;
`;

export const TableSectionTd = styled.td<TableSectionTdProps>`
  min-width: 150px;
  padding: 5px 10px;
  text-align: ${(props) => (props.$textalign ? props.$textalign : "left")};
`;
