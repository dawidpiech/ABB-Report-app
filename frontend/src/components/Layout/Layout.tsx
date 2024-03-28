import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../../config/azureConfig";
import { Login } from "../Login/Login";

export const Layout = () => {
  const { instance, accounts } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(() => {});
  };

  return (
    <>
      <UnauthenticatedTemplate>
        <Header></Header>
        <Login handleLogin={handleLogin}></Login>
        <Footer></Footer>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <Header
          userName={accounts.length > 0 ? accounts[0].name : ""}
          userMail={accounts.length > 0 ? accounts[0].username : ""}
          logout={handleLogout}
        ></Header>
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer></Footer>
      </AuthenticatedTemplate>
    </>
  );
};
