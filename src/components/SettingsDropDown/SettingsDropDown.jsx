import "./scss/settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faKey } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

export default function SettingsDropDown() {
  return (
    <>
      <div className="settings">
        <ul>
          <li>
            <Link href="/">Change Password</Link>
            <FontAwesomeIcon icon={faKey} style={{ paddingLeft: "5px" }} />
          </li>
          <li>
            <Link href="/">Logout</Link>
            <FontAwesomeIcon icon={faSignOut} style={{ paddingLeft: "5px" }} />
          </li>
        </ul>
      </div>
    </>
  );
}
