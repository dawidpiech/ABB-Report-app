import styled from "styled-components";

export const LoginWrapper = styled.div`
  text-align: center;
  min-height: calc(100vh - 150px);
`;

export const LoginButton = styled.button`
  padding: 15px 100px;
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 15px;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 900;
  font-size: 1.2rem;
  cursor: pointer;
`;
