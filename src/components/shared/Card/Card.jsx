import "./scss/card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserServices from "../../../services/users.services.js";
import RolesServices from "../../../services/roles.services.js";
import GroupsServices from "../../../services/groups.services.js";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Card({ entity }) {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const getCount = async () => {
      if (entity.name === "Users") {
        const us = new UserServices();
        setNumber(await us.count());
      }
      if (entity.name === "Roles") {
        const rs = new RolesServices();
        setNumber(await rs.count());
      }
      if (entity.name === "Groups") {
        const gs = new GroupsServices();
        setNumber(await gs.count());
      }
    };
    getCount();
  }, [entity.name]);
  return (
    <div className="layout">
      <div
        className="card"
        onClick={() => {
          navigate(`/${entity.link}`);
        }}
      >
        <div className="upper-card">
          <div className="upper-inner">
            <FontAwesomeIcon icon={entity.icon} />
            <span>{entity.name}</span>
          </div>
          {/* <Link to={`/${entity.link}`}>
            <FontAwesomeIcon icon={faUpRightFromSquare} className="open" />
          </Link> */}
        </div>
        <div className="lower-card">
          Total {entity.name}: {number}
        </div>
      </div>
    </div>
  );
}
