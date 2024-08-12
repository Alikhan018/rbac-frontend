import "./scss/datacomp.css";
import React, { useMemo, useState } from "react";
import BasicTable from "../MaterialTable/MT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function DataComponent({
  entity,
  icon,
  showRoles,
  showGroups,
  showUsers,
  onClick,
}) {
  const initialSelected = useMemo(() => {
    if (showRoles) return "roles";
    if (showUsers) return "users";
    if (showGroups) return "groups";
    return "";
  }, [showUsers, showGroups, showRoles]);
  const [selected, setSelected] = useState(initialSelected);
  return (
    <div className="data-comp">
      <div className="data-left">
        <FontAwesomeIcon
          icon={icon}
          style={{ width: "200px", height: "50px" }}
        />
        <Button
          text={"Change Password"}
          type={"button"}
          icon={faPen}
          onClick={onClick}
        />
      </div>
      <div className="data-right">
        <div className="details">
          <h3>{entity.name || entity.email}</h3>
          <div>
            {showRoles && <p>Roles: {entity["roles"]?.length}</p>}
            {showUsers && <p>Users: {entity["users"]?.length}</p>}
            {showGroups && <p>Groups: {entity["groups"]?.length}</p>}
          </div>
        </div>
        <div className="navigation">
          {showRoles && <p onClick={() => setSelected("roles")}>Roles</p>}
          {showUsers && <p onClick={() => setSelected("users")}>Users</p>}
          {showGroups && <p onClick={() => setSelected("groups")}>Groups</p>}
          <div
            className={`
                  ${showRoles && showUsers ? `underline-${selected}-two` : ""}
                  ${showGroups && showUsers ? `underline-${selected}` : ""}
                  ${showRoles && showGroups ? `underline-${selected}` : ""}
                `}
          ></div>
        </div>
        <BasicTable rows={entity[selected]} onDelete={() => {}} />
      </div>
    </div>
  );
}
