import React from "react";
import { addForm } from "../../props/forms";
import Form from "../../components/shared/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUser, createGroup } from "../../props/formHandlers";
import { useNavigate } from "react-router-dom";

export default function AddNew({ entity, icon }) {
  const nav = useNavigate();
  const styles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "20px",
    gap: "15px",
    backgroundColor: "rgb(236, 236, 236)",
  };
  return (
    <div style={styles}>
      <h3>
        <FontAwesomeIcon icon={icon} style={{ paddingRight: "10px" }} />
        Create new {entity}
      </h3>
      {entity === "user" && (
        <Form
          inputs={addForm[entity]}
          type={"add/update"}
          showGroups={true}
          showRoles={true}
          showUsers={false}
          onClick={(formData) => {
            createUser(formData);
            nav("/users");
          }}
        />
      )}
      {entity === "group" && (
        <Form
          inputs={addForm[entity]}
          type={"add/update"}
          showGroups={false}
          showRoles={true}
          showUsers={true}
          onClick={(formData) => {
            createGroup(formData);
            nav("/groups");
          }}
        />
      )}
      {entity === "role" && (
        <Form
          inputs={addForm[entity]}
          type={"add/update"}
          showGroups={true}
          showRoles={false}
          showUsers={true}
        />
      )}
    </div>
  );
}
