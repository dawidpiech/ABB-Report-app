import styled from "styled-components";

interface StyledButton {
  color: string;
}

export const StyledButton = styled.button<StyledButton>`
  background-color: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 20px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-weight: 900;
  cursor: pointer;
`;
