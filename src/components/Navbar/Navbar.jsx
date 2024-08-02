import "./scss/navbar.css";
import logo from "../../assets/images/logo-navbar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SettingsDropDown from "../SettingsDropDown/SettingsDropDown";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const iconStyle = {
    fontSize: "18px",
    cursor: "pointer",
    color: isHovered ? "blue" : "black",
  };
  return (
    <div className="header-container">
      <div className="logo-left">
        <img
          src={logo}
          alt="logo here"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">Users</a>
          </li>
        </ul>
      </nav>
      <div className="icons-list">
        <FontAwesomeIcon
          title="settings"
          icon={faGear}
          style={iconStyle}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        />
      </div>
      {isClicked && <SettingsDropDown />}
    </div>
  );
}
