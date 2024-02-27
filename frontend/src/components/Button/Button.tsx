import { FieldWrapper } from "../FieldWrapper/FieldWrapper";
import { StyledButton } from "./Button.styles";

interface ButtonProps {
  children: React.ReactNode;
  width?: number;
  color?: string;
  display?: string;
  alignitems?: string;
  disabled: boolean;
}

export const Button = ({
  width,
  color,
  children,
  display,
  alignitems,
  disabled,
}: ButtonProps) => {
  return (
    <FieldWrapper width={width} display={display} alignitems={alignitems}>
      <StyledButton color={color} disabled={disabled}>
        {children}
      </StyledButton>
    </FieldWrapper>
  );
};
