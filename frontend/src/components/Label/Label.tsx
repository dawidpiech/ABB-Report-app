import { LabelWrapper } from "./Label.styles";

interface LabelProps {
  children?: React.ReactNode;
}

export const Label = ({ children }: LabelProps) => {
  return <LabelWrapper>{children}</LabelWrapper>;
};
