import styled from "styled-components";

export const StyledFileUploadWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 20px 0;
`;

export const StyledLabel = styled.label`
  font-weight: 600;
`;

export const StyledValue = styled.div``;

export const StyledFile = styled.button`
  width: 100%;
  margin: 5px 0;
  cursor: pointer;
  background-color: unset;
  border: none;
  color: ${({ theme }) => theme.colors.red};
  text-align: left;
  font-weight: 600;
  padding: 0;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  margin: 10px 10px;
`;

export const LoadingSpinnerLabel = styled.p`
  margin: 5px 0;
  font-weight: 300;
  font-size: 0.8rem;
`;

export const LoadingSpinnerAnimation = styled.div`
  width: 0.5rem;
  aspect-ratio: 1;
  position: relative;
  animation: l9-0 1.5s infinite steps(2);

  &::before,
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.red};
  }

  &::before {
    box-shadow: 16px 0 ${({ theme }) => theme.colors.red};
    transform: translateX(-16px);
    animation: l9-1 0.75s infinite linear alternate;
  }

  &::after {
    transform: translateX(8px) rotate(0deg) translateX(8px);
    animation: l9-2 0.75s infinite linear alternate;
  }

  @keyframes l9-0 {
    0%,
    49.9% {
      transform: scale(1);
    }
    50%,
    100% {
      transform: scale(-1);
    }
  }

  @keyframes l9-1 {
    100% {
      box-shadow: 32px 0 ${({ theme }) => theme.colors.red};
    }
  }

  @keyframes l9-2 {
    100% {
      transform: translateX(8px) rotate(-180deg) translateX(8px);
    }
  }
`;
