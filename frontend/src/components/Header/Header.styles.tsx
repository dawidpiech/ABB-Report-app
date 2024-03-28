import styled from "styled-components";

export const ABBLogo = styled.img`
  width: auto;
  height: 60px;
  margin-left: 30px;

  @media screen and (max-width: 768px) {
    height: 40px;
    margin-left: 10px;
  }
`;

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 3px 3px ${({ theme }) => theme.colors.lightGray};
`;

export const UserDataWrapper = styled.div`
  position: relative;
  margin-right: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    margin-right: 25px;
  }
`;

export const UserDataWrapperInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: -10px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${({ theme }) => theme.colors.red};
  }
`;

export const UserIcon = styled.img`
  width: 30px;
  margin-right: 10px;
`;

export const UserName = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.red};
  font-weight: 600;
`;

export const UserMail = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

interface SignOutProps {
  $isHidden: boolean;
}

export const SignOut = styled.div<SignOutProps>`
  position: absolute;
  display: ${(props) => (props.$isHidden ? "none" : "block")};
  right: -10px;
  bottom: -3rem;
  z-index: 10000;
  min-width: 160px;
  padding: 5px 0;
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: 0px 0px 8px ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
`;
