import React, { useState } from "react";
import { addForm, changePassword, updateForm } from "../../props/forms";
import Form from "../../components/shared/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUser,
  updateUser,
  createGroup,
  createRole,
  updateGroup,
  updateRole,
  changePasswordForUser,
} from "../../props/formHandlers";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddUpdate({ entity, icon, task }) {
  const location = useLocation();
  const id = location.state?.id || 0;
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
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
      {entity === "user" && task === "change-password" && (
        <>
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
          <Form
            task={task}
            inputs={changePassword}
            type={"change-password"}
            showGroups={false}
            showRoles={false}
            showUsers={false}
            onClick={async (formData) => {
              const res = await changePasswordForUser(formData, id);
              console.log(res);
              if (res === "Not matched") {
                setErrorMessage("Passwords do not match. Please try again.");
                return;
              }
              setErrorMessage("");
              nav("/users");
            }}
          />
        </>
      )}
      {entity === "user" && task !== "change-password" && (
        <>
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
          <Form
            task={task}
            inputs={task === "update" ? updateForm[entity] : addForm[entity]}
            type={"add/update"}
            showGroups={true}
            showRoles={true}
            showUsers={false}
            onClick={async (formData) => {
              if (task === "update") {
                updateUser(formData);
              } else {
                const res = await createUser(formData);
                if (res === "Not matched") {
                  setErrorMessage("Passwords donot match. Please try again");
                  return;
                }
                setErrorMessage("");
              }
              nav("/users");
            }}
          />
        </>
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
