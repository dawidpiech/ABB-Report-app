import styled from "styled-components";

export const ABBLogo = styled.img`
  width: auto;
  height: 60px;
  margin-left: 60px;
`;

export const HeaderWrapper = styled.footer`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: left;
`;
