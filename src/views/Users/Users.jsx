import "./scss/users.css";
import React, { useEffect, useState } from "react";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import UserServices from "../../services/users.services";
import { headerUsers } from "../../props/tables";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const us = new UserServices();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await us.getAllUsers();
        setUsers(response.data);
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
      us.deleteUser(id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="user-container">
        <h1>Users</h1>
        {err && <Error />}
        {users && (
          <Table header={headerUsers} data={users} onDelete={onDelete} />
        )}
      </div>
    </>
  );
}
