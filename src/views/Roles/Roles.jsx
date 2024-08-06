import React, { useState, useEffect } from "react";
import RolesServices from "../../services/roles.services";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import { headerRoles } from "../../props/tables";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [err, setErr] = useState(false);
  const rs = new RolesServices();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await rs.getAllRoles();
        setRoles(response.data);
        setErr(false);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
    getData();
  }, []);
  const onDelete = (id) => {
    try {
      rs.deleteRole(id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddClick = () => {
    navigate("/add-new-role");
  };
  return (
    <>
      <div className="user-container">
        {err && <Error />}
        <h1>Roles</h1>
        {roles && (
          <Table
            header={headerRoles}
            data={roles}
            onDelete={onDelete}
            btnText={"Add new role"}
            onAdd={handleAddClick}
            addBtn={true}
          />
        )}
      </div>
    </>
  );
}
