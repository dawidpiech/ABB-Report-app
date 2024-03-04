import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledTable = styled.table`
  z-index: 0;
`;

export const StyledThead = styled.thead``;

export const StyledTbody = styled.tbody``;

interface StyledTrProps {
  background: boolean;
}

export const StyledTr = styled.tr<StyledTrProps>`
  background-color: ${(props) =>
    props.background
      ? ({ theme }) => theme.colors.lightGray
      : ({ theme }) => theme.colors.white};
`;

export const StyledTh = styled.th`
  text-align: left;
  font-size: 0.92rem;
`;

export const StyledTd = styled.td`
  padding: 10px 5px;
  min-width: 105px;
`;

export const StyledLink = styled(Link)`
  width: 100%;
  display: block;
  height: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;
`;

export const StyledTableWrapper = styled.div`
  width: 100%;
  display: block;
  height: 100%;
  position: relative;
`;
