import { Link } from "react-router-dom";
import { FooterWrapper } from "./Footer.styles";

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        © ABB 2024, all rights reserved Designed and delivered by
        <Link to="https://piech.it/" rel="noopener noreferrer" target="_blank">
          {" "}
          Dawid Piech
        </Link>
      </p>
    </FooterWrapper>
  );
};
