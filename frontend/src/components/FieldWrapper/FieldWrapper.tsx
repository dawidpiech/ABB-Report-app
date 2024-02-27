import { FieldWrapperBlock } from "./FieldWrapper.styles";

export interface FieldWrapperProps {
  children: React.ReactNode;
  width?: number;
  display?: string;
  alignItems?: string;
}

export const FieldWrapper = ({
  children,
  width,
  display,
  alignItems,
}: FieldWrapperProps) => {
  return (
    <FieldWrapperBlock width={width} display={display} alignItems={alignItems}>
      {children}
    </FieldWrapperBlock>
  );
};
