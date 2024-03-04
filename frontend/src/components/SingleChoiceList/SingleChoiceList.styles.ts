import { GroupData } from "./../GroupData/GroupData";
import styled from "styled-components";

export const StyledLabel = styled.label`
  font-weight: 600;
  width: 40%;
`;

export const StyledValue = styled.div`
  margin-left: 30px;
  width: 60%;
`;

export const StyledNewValue = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.green};
`;

export const StyledRadio = styled.span`
  display: inline-block;
  margin-right: 10px;
  width: 0.8rem;
  height: 0.8rem;
  cursor: not-allowed;
  border-radius: 0.8rem;
  border: 1px ${({ theme }) => theme.colors.gray} solid;

  &::after {
    content: "";
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.6rem;
    background-color: ${({ theme }) => theme.colors.red};
    opacity: 0.8;
    margin-top: 0.08rem;
    margin-left: 0.075rem;
  }
`;
