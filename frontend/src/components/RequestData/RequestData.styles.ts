import styled from "styled-components";

interface RequestDataMenuElementProps {
  $isActive: boolean;
}

export const RequestDataWrapper = styled.div`
  display: flex;
  padding: 30px 0;
  flex-wrap: wrap;
`;

export const RequestDataMenu = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 4px 0 0 4px;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const RequestDataMenuElement = styled.div<RequestDataMenuElementProps>`
  background-color: ${(props) =>
    props.$isActive
      ? ({ theme }) => theme.colors.white
      : ({ theme }) => theme.colors.lightGray};
  color: ${(props) =>
    props.$isActive
      ? ({ theme }) => theme.colors.red
      : ({ theme }) => theme.colors.black};
  border: 1px ${({ theme }) => theme.colors.gray}3A solid;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px;
  cursor: pointer;
  ${(props) => (props.$isActive ? "border-right: none" : "")};

  &:hover {
    ${(props) =>
      props.$isActive ? "" : `background-color: ${props.theme.colors.gray}3a`};
  }
`;

export const RequestDataContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px ${({ theme }) => theme.colors.gray}3A solid;
  border-left: none;
  padding: 20px;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
