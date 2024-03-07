import styled, { keyframes } from "styled-components";

const shrinkAnimation = keyframes`
  from {
    transform: translateX(-50%) scaleX(1);
  }
  to {
    transform: translateX(-50%) scaleX(0);
  }
`;

const slideAnimation = keyframes`
  from {
    transform: translateX(-50%) translateY(200%);
  }
  to {
    transform: translateX(-50%) translateY(0);
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  background-color: white;
  padding: 25px 25px 15px;
  color: ${({ theme }) => theme.colors.brightRed};
  border: 3px solid ${({ theme }) => theme.colors.brightRed};
  border-radius: 15px;
  animation: ${slideAnimation} 1s ease-in-out 1 forwards,
    ${slideAnimation} 1s 6s ease-in-out 1 reverse forwards;
  z-index: 10000001;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.brightRed};
    width: 60px;
    height: 5px;
    border-radius: 50px;
  }

  &::before {
    opacity: 0.5;
  }

  &::after {
    transform: translateX(-50%) scaleX(1);
    transform-origin: left top;
    animation: ${shrinkAnimation} 5s 1s linear 1 forwards;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.brightRed};
  margin-bottom: 10px;
`;

export const Content = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.brightRed};
  margin: 0;
`;

export const Message = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.brightRed};
  margin: 0;
`;
