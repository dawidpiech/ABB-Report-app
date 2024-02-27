import { HeaderWrapper } from "./Header.styles";
import ABBLogoSrc from "../../assets/ABB_logo.svg";
import { ABBLogo } from "../Header/Header.styles";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <ABBLogo src={ABBLogoSrc} alt="ABB logo" />
      </Link>
    </HeaderWrapper>
  );
};
