import "./scss/error.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function Error() {
  return (
    <div className="err-container">
      <h1 style={{ color: "red" }}>
        <FontAwesomeIcon icon={faWarning} />
        {/* Error */}
      </h1>
    </div>
  );
}
