import React from "react";
import { StyledFieldWrapper } from "./FieldWrapper.styles";

interface FieldWrapperProps {
  children: React.ReactNode;
}

export const FieldWrapper = ({ children }: FieldWrapperProps) => {
  return <StyledFieldWrapper>{children}</StyledFieldWrapper>;
};
