import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";
import { FieldGroupBlock, FieldGroupName } from "./FieldGroup.styles";

export interface FieldGroupProps {
  children: React.ReactNode;
  name?: string;
  width?: number;
  error?: boolean;
  errorMessage?: string;
}

export const FieldGroup = ({
  children,
  name,
  width,
  error,
  errorMessage,
}: FieldGroupProps) => {
  return (
    <FieldGroupBlock width={width}>
      <FieldGroupName>{name}</FieldGroupName>
      {children}
      {error ? (
        <FormErrorMessage errorMessage={errorMessage}></FormErrorMessage>
      ) : (
        ""
      )}
    </FieldGroupBlock>
  );
};
