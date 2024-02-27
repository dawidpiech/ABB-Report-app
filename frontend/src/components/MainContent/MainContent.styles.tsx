import styled from "styled-components";

export const MainContentWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const MainContentWrapperInner = styled.div`
  width: 1440px;
  min-height: calc(100vh - 140px);
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: left;
  position: relative;
  flex-direction: column;
`;
