import styled from "styled-components";

export const StyledLabel = styled.label`
  font-weight: 600;
  width: 40%;
`;

export const StyledValue = styled.div`
  margin-left: 30px;
  width: 60%;
`;

export const StyledOldValue = styled.span`
  display: block;
  font-size: 0.8rem;

  span {
    color: red;
  }
`;

export const StyledNewValue = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.green};
`;
