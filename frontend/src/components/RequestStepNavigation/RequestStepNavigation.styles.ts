import styled from "styled-components";
import { Link } from "react-router-dom";

interface StepWrapperProps {
  $isActive: boolean;
  transformx: number;
}

export const RequestStepsNavigationWrapper = styled.div`
  display: flex;
  width: 100%;
  align-self: center;
  flex-wrap: nowrap;
  margin: 10px 0 0;
  padding: 0 20px;
  height: 100px;
  align-items: center;
`;

export const RequestStepsWrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const StepWrapper = styled(Link)<StepWrapperProps>`
  transition: 0.5s ease-out;
  transform: ${(props) => `translateX(${props.transformx}px)`};
  flex: 1 0 200px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 600;
  display: flex;
  height: 100%;
  z-index: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${(props) =>
    props.$isActive
      ? ({ theme }) => theme.colors.red
      : ({ theme }) => theme.colors.lightGray};
  color: ${(props) =>
    props.$isActive
      ? ({ theme }) => theme.colors.white
      : ({ theme }) => theme.colors.black};
  border-bottom: 5px ${({ theme }) => theme.colors.red} solid;
  font-size: 0.8rem;
`;

export const RequestStepArrowRight = styled.button`
  display: block;
  z-index: 1;
  width: 25px;
  height: 25px;
  visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
  border-right: 4px solid
    ${(props) =>
      props.disabled
        ? ({ theme }) => theme.colors.gray
        : ({ theme }) => theme.colors.red};
  border-bottom: 4px solid
    ${(props) =>
      props.disabled
        ? ({ theme }) => theme.colors.gray
        : ({ theme }) => theme.colors.red};
  border-top: none;
  border-left: none;
  background: none;
  transform: rotate(-45deg);
  cursor: pointer;
  border-radius: 1px 5px 5px 5px;

  :focus-visible {
    outline: none;
  }
`;

export const RequestStepArrowLeft = styled.button`
  z-index: 1;
  display: block;
  width: 25px;
  height: 25px;
  visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
  border-top: 4px solid
    ${(props) =>
      props.disabled
        ? ({ theme }) => theme.colors.gray
        : ({ theme }) => theme.colors.red};
  border-left: 4px solid
    ${(props) =>
      props.disabled
        ? ({ theme }) => theme.colors.gray
        : ({ theme }) => theme.colors.red};
  border-right: none;
  border-bottom: none;
  background: none;
  transform: rotate(-45deg);
  cursor: pointer;
  border-radius: 5px 5px 1px 5px;

  :focus-visible {
    outline: none;
  }
`;
