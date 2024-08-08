import React from "react";
import { addForm } from "../../props/forms";
import Form from "../../components/shared/Form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { alignProperty } from "@mui/material/styles/cssUtils";

export default function AddNew({ entity, icon }) {
  const styles = {
    width: "350px",
    position: "fixed",
    top: "45%",
    left: "50%",
    transform: "translate(-50%,-50%)",
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
      <Form inputs={addForm[entity]} type={"add/update"} />
    </div>
  );
}
