import "./scss/settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faKey } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function SettingsDropDown() {
  return (
    <>
      <div className="settings">
        <ul>
          <li>
            <a href="/">Change Password</a>
            <FontAwesomeIcon icon={faKey} style={{ paddingLeft: "5px" }} />
          </li>
          <li>
            <a href="/">Logout</a>
            <FontAwesomeIcon icon={faSignOut} style={{ paddingLeft: "5px" }} />
          </li>
        </ul>
      </div>
    </>
  );
}
