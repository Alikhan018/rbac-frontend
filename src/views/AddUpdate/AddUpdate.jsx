import React from "react";
import { addForm, updateForm } from "../../props/forms";
import Form from "../../components/shared/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUser,
  updateUser,
  createGroup,
  createRole,
  updateGroup,
  updateRole,
} from "../../props/formHandlers";
import { useNavigate } from "react-router-dom";

export default function AddUpdate({ entity, icon, task }) {
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
      <h3 style={{ textTransform: "uppercase" }}>
        <FontAwesomeIcon icon={icon} style={{ paddingRight: "10px" }} />
        {task} {entity}
      </h3>
      {entity === "user" && (
        <Form
          task={task}
          inputs={task === "update" ? updateForm[entity] : addForm[entity]}
          type={"add/update"}
          showGroups={true}
          showRoles={true}
          showUsers={false}
          onClick={(formData) => {
            task === "update" ? updateUser(formData) : createUser(formData);
            nav("/users");
          }}
        />
      )}
      {entity === "group" && (
        <Form
          task={task}
          inputs={task === "update" ? updateForm[entity] : addForm[entity]}
          type={"add/update"}
          showGroups={false}
          showRoles={true}
          showUsers={true}
          onClick={(formData) => {
            task === "update" ? updateGroup(formData) : createGroup(formData);
            nav("/groups");
          }}
        />
      )}
      {entity === "role" && (
        <Form
          task={task}
          inputs={task === "update" ? updateForm[entity] : addForm[entity]}
          type={"add/update"}
          showGroups={true}
          showRoles={false}
          showUsers={true}
          onClick={(formData) => {
            task === "update" ? updateRole(formData) : createRole(formData);
            nav("/roles");
          }}
        />
      )}
    </div>
  );
}
