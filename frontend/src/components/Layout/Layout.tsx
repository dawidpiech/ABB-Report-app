import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer></Footer>
    </>
  );
};
