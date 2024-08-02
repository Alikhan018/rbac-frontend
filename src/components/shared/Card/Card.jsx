import "./scss/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function Card({ entity }) {
  return (
    <div className="layout">
      <div className="card">
        <div className="upper-card">
          <div className="upper-inner">
            <FontAwesomeIcon icon={entity.icon} />
            <span>{entity.name}</span>
          </div>
          <FontAwesomeIcon icon={faUpRightFromSquare} className="open"/>
        </div>
        <div className="lower-card">
          Total {entity.name}: {entity.qty}
        </div>
      </div>
    </div>
  );
}
