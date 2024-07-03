import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.jfif";

const options = {
  burgerColorHover: "#179355",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#179355",
  link1Text: "Home",
  link2Text: "Books",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/books",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#179355",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#179355",
  searchIconColorHover: "#179355",
  cartIconColorHover: "#179355",
  cartIconMargin: "1vmax",
  cartIconUrl: "./wishlist"
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
