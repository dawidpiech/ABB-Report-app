import styled from "styled-components";

export const CustomNotFoundPage = styled.div`
  width: 100%;
  min-height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  font-weight: 900;
`;
