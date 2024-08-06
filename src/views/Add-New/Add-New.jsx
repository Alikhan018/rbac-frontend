import React from "react";
import { addForm } from "../../props/forms";
import Form from "../../components/shared/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddNew({ entity, icon }) {
  return (
    <div className="container" style={{ flexDirection: "column", gap: "20px" }}>
      <h3>
        <FontAwesomeIcon icon={icon} style={{ paddingRight: "10px" }} />
        Create new {entity}
      </h3>
      <Form inputs={addForm[entity]} />
    </div>
  );
}
