import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./scss/dropdown.scss";

export default function DropDown({ onDelete, onEdit }) {
  return (
    <div className="dropdown-container">
      <div onClick={onEdit}>
        Edit
        <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
      </div>
      <div onClick={onDelete}>
        Delete
        <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
      </div>
    </div>
  );
}
