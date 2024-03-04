import { FieldWrapperBlock } from "./FormFieldWrapper.styles";

export interface FieldWrapperProps {
  children: React.ReactNode;
  width?: number;
  display?: string;
  alignitems?: string;
}

export const FormFieldWrapper = ({
  children,
  width,
  display,
  alignitems,
}: FieldWrapperProps) => {
  return (
    <FieldWrapperBlock width={width} display={display} alignitems={alignitems}>
      {children}
    </FieldWrapperBlock>
  );
};
