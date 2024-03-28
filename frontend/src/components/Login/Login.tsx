import { LoginButton, LoginWrapper } from "./Login.styles";

interface LoginProps {
  handleLogin: () => void;
}

export const Login = ({ handleLogin }: LoginProps) => {
  return (
    <LoginWrapper>
      <h1>You are not logged in. Log in to use the application. </h1>
      <LoginButton onClick={handleLogin}>Sign in</LoginButton>
    </LoginWrapper>
  );
};
