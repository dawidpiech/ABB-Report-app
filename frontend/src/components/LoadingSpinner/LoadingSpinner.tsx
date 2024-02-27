import {
  LoadingSpinnerAnimation,
  LoadingSpinnerWrapper,
  ABBLogo,
  LoadingSpinnerWrapperInner,
} from "./LoadingSpinner.styles";
import ABBLogoSrc from "../../assets/ABB_logo.svg";

interface LoadingSpinnerProps {
  version?: string;
  zindex?: number;
}

export const LoadingSpinner = ({ version, zindex }: LoadingSpinnerProps) => {
  return (
    <LoadingSpinnerWrapper zindex={zindex} version={version}>
      <LoadingSpinnerWrapperInner>
        <ABBLogo src={ABBLogoSrc} alt="ABB logo" />
        <LoadingSpinnerAnimation />
      </LoadingSpinnerWrapperInner>
    </LoadingSpinnerWrapper>
  );
};
