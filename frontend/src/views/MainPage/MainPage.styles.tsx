import styled from "styled-components";

export const MainPageWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const MainPageWrapperInner = styled.div`
  width: 1440px;
  min-height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: left;
`;
