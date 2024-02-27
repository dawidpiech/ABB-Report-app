import { FieldWrapper } from "../FieldWrapper/FieldWrapper";
import { StyledButton } from "./Button.styles";

interface ButtonProps {
  children: React.ReactNode;
  width?: number;
  color?: string;
  display?: string;
  alignitems?: string;
}

export const Button = ({
  width,
  color,
  children,
  display,
  alignitems,
}: ButtonProps) => {
  return (
    <FieldWrapper width={width} display={display} alignitems={alignitems}>
      <StyledButton color={color}>{children}</StyledButton>
    </FieldWrapper>
  );
};
