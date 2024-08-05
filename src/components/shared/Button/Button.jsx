import React from "react";
// import "./scss/button.css";

export default function Button({ text, type }) {
  return <button type={type}>{text}</button>;
}
