import styled from "styled-components";

export const ABBLogo = styled.img`
  width: auto;
  height: 60px;
  margin-left: 20px;
`;

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  box-shadow: 0px 3px 3px ${({ theme }) => theme.colors.lightGray};
`;
