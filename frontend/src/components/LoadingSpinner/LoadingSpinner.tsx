import { LoadingSpinnerWrapper } from "./LoadingSpinner.styles";

interface LoadingSpinnerProps {
  children: React.ReactNode;
}

export const LoadingSpinner = ({ children }: LoadingSpinnerProps) => {
  return <LoadingSpinnerWrapper>{children}</LoadingSpinnerWrapper>;
};
