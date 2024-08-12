import "./scss/view.css";
import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../services/index.services";
import DataComponent from "../../components/shared/DataComponent/DataComponent";
import { faGear, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export default function ViewData({ entity, showUsers, showRoles, showGroups }) {
  const navigate = useNavigate();
  const icon = useMemo(() => {
    if (!showRoles) return faGear;
    if (!showUsers) return faUser;
    if (!showGroups) return faUserGroup;
    return "";
  }, [showUsers, showGroups, showRoles]);
  const location = useLocation();
  const { id } = location.state || null;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      setData(await fetchData(`${entity}/${id}`));
    };
    fetch();
  }, [id, entity]);
  const changeButtonClick = () => {
    navigate("change-password");
  };

  return (
    <div>
      {id ? (
        <div className="view-container">
          <DataComponent
            entity={data}
            icon={icon}
            showUsers={showUsers}
            showRoles={showRoles}
            showGroups={showGroups}
            onClick={changeButtonClick}
          />
        </div>
      ) : (
        <div>No id found</div>
      )}
    </div>
  );
}
