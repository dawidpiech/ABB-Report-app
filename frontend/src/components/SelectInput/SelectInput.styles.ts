import styled from "styled-components";

export const StyledSelect = styled.select`
  min-height: 2rem;
  font-size: 1.2rem;
  border: unset;
  border-radius: 4px;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.brightRed};
  }
`;

export const StyledOption = styled.option`
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.red};
    cursor: pointer;
  }
`;
