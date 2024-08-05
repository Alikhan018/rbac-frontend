import "./scss/navbar.css";
import logo from "../../assets/images/logo-navbar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SettingsDropDown from "../SettingsDropDown/SettingsDropDown";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

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
            navigate("home");
          }}
        />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
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
