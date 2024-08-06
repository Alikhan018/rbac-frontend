import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./scss/button.css";

export default function Button({ text, type, icon, onClick }) {
  let className;
  if (type === "submit") {
    className = "primary";
  }
  if (type === "reset") {
    className = "danger";
  }
  if (type === "button") {
    className = "success";
  }
  return (
    <button type={type} className={className} onClick={onClick}>
      {text} <FontAwesomeIcon icon={icon} />
    </button>
  );
}
