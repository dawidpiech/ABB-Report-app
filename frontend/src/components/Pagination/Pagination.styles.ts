import styled from "styled-components";

interface PaginationLinkProps {
  active: boolean;
}

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  z-index: 10000;
`;

export const PaginationLink = styled.button<PaginationLinkProps>`
  margin: 0 5px;
  min-width: 35px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  font-weight: ${(props) => (props.active ? 700 : 400)};
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.active
      ? ({ theme }) => theme.colors.red
      : ({ theme }) => theme.colors.lightGray};
  color: ${(props) =>
    props.active
      ? ({ theme }) => theme.colors.white
      : ({ theme }) => theme.colors.black};
`;

export const Dots = styled.span`
  margin: 0 5px;
`;
