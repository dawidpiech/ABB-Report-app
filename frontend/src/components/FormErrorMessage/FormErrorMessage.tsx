import { FormErrorMessageWrapper } from "./FormErrorMessage.styles";

interface FormErrorMessageProps {
  errorMessage?: string;
}

export const FormErrorMessage = ({ errorMessage }: FormErrorMessageProps) => {
  return <FormErrorMessageWrapper>{errorMessage}</FormErrorMessageWrapper>;
};
