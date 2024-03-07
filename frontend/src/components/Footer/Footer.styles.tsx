import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  box-shadow: 0px -3px 3px ${({ theme }) => theme.colors.lightGray};
  position: relative;

  @media screen and (max-width: 767px) {
    font-size: 0.8rem;
    padding: 0 15px;
    text-align: center;
  }

  p {
    a {
      color: ${({ theme }) => theme.colors.red};
      text-decoration: none;
      font-weight: 900;
    }
  }
`;
