import {
  HeaderWrapper,
  SignOut,
  UserDataWrapper,
  UserDataWrapperInner,
  UserIcon,
  UserMail,
  UserName,
} from "./Header.styles";
import ABBLogoSrc from "../../assets/ABB_logo.svg";
import userIcon from "../../assets/user_icon.svg";
import { ABBLogo } from "../Header/Header.styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface HeaderProps {
  userName?: string | undefined;
  userMail?: string | undefined;
  logout?: () => void;
}

export const Header = ({ userName, userMail, logout }: HeaderProps) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const userDataContainer = document.querySelector(".user-data");
    const logoutButton = document.querySelector(".logout-button");
    document.addEventListener("mousedown", (e) => {
      if (userDataContainer !== e.target) setIsHidden(true);
      if (e.target === logoutButton && logout) logout();
    });
  });

  return (
    <HeaderWrapper>
      <Link to="/">
        <ABBLogo src={ABBLogoSrc} alt="ABB logo" />
      </Link>
      {userName ? (
        <UserDataWrapper
          className="user-data"
          onClick={() => setIsHidden(!isHidden)}
        >
          <UserIcon src={userIcon} alt="User Icon" />
          <UserDataWrapperInner>
            <UserName>{userName}</UserName>
            <UserMail>{userMail}</UserMail>
          </UserDataWrapperInner>
          <SignOut
            $isHidden={isHidden}
            className="logout-button"
            onClick={() => {
              logout ? logout() : "";
            }}
          >
            Logout
          </SignOut>
        </UserDataWrapper>
      ) : (
        ""
      )}
    </HeaderWrapper>
  );
};
