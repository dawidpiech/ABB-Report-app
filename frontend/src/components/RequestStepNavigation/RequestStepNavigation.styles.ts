import styled from "styled-components";
import { Link } from "react-router-dom";

interface StepWrapperProps {
  isActive: boolean;
}

export const RequestStepNavigationWrapper = styled.div`
  margin-top: 40px;
  z-index: 0;
  overflow-x: hidden;
  height: 100px;
  display: flex;
  flex-wrap: nowrap;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &.draggable {
    cursor: grabbing;
    -ms-user-select: none;
    user-select: none;
  }

  @media screen and (max-width: 1024px) {
    overflow-x: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 20px;
  }
`;

export const StepWrapper = styled(Link)<StepWrapperProps>`
  width: fit-content;
  min-width: 200px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 600;
  display: flex;
  z-index: 0;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  text-align: center;
  margin: 0 10px;
  background-color: ${(props) =>
    props.isActive
      ? ({ theme }) => theme.colors.red
      : ({ theme }) => theme.colors.lightGray};
  color: ${(props) =>
    props.isActive
      ? ({ theme }) => theme.colors.white
      : ({ theme }) => theme.colors.black};
  border-bottom: 5px ${({ theme }) => theme.colors.red} solid;
  font-size: 0.8rem;
`;
