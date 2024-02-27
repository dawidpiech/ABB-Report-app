import styled from "styled-components";

export const FooterWrapper = styled.footer`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1rem;
    a {
      color: ${({ theme }) => theme.colors.red};
      text-decoration: none;
      font-weight: 900;
    }
  }
`;
