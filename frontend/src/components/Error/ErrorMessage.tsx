import { Content, Message, Title } from "./ErrorMessage.styles";
import { Wrapper } from "./ErrorMessage.styles";

interface ErrorMessageProps {
  message?: string;
}

const defaultErrorMessage =
  "Something went wrong. Please try again, or contact our support.";

export const ErrorMessage = ({
  message = defaultErrorMessage,
}: ErrorMessageProps) => {
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Content>{"Something went wrong, please try again later."}</Content>
      <Message>{message}</Message>
    </Wrapper>
  );
};

export default ErrorMessage;
