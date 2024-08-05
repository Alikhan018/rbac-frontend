import React, { useState, useEffect } from "react";
import RolesServices from "../../services/roles.services";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import { headerRoles } from "../../props/tables";

export default function Groups() {
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
  return (
    <>
      <div className="user-container">
        {err && <Error />}
        <h1>Roles</h1>
        {roles && (
          <Table header={headerRoles} data={roles} onDelete={onDelete} />
        )}
      </div>
    </>
  );
}
