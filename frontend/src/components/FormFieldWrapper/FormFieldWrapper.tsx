import { FieldWrapperBlock } from "./FormFieldWrapper.styles";

export interface FieldWrapperProps {
  children: React.ReactNode;
  width?: number | undefined;
  display?: string | undefined;
  alignitems?: string | undefined;
}

export const FormFieldWrapper = ({
  children,
  width,
  display,
  alignitems,
}: FieldWrapperProps) => {
  return (
    <FieldWrapperBlock
      $width={width}
      $display={display}
      $alignitems={alignitems}
    >
      {children}
    </FieldWrapperBlock>
  );
};
