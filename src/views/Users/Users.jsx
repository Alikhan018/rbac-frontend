import React, { useEffect, useState } from "react";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import UserServices from "../../services/users.services";
import { headerUsers } from "../../props/tables";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const us = new UserServices();
        const response = await us.getAllUsers();
        console.log(response);
        setUsers(response.data);
        setErr(false);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
    getData();
  }, []);
  return (
    <>
      {err && <Error />}
      {users && <Table header={headerUsers} data={users} />}
    </>
  );
}
