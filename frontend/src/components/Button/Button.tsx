import { FieldWrapper } from "../FieldWrapper/FieldWrapper";
import { StyledButton } from "./Button.styles";

interface ButtonProps {
  children: React.ReactNode;
  width?: number;
  color?: string;
  display?: string;
  alignItems?: string;
}

export const Button = ({
  width,
  color,
  children,
  display,
  alignItems,
}: ButtonProps) => {
  return (
    <FieldWrapper width={width} display={display} alignItems={alignItems}>
      <StyledButton color={color}>{children}</StyledButton>
    </FieldWrapper>
  );
};
