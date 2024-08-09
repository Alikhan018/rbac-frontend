import "./scss/users.css";
import React, { useEffect, useState } from "react";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import UserServices from "../../services/users.services";
import { headerUsers } from "../../props/tables";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const us = new UserServices();
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
    const us = new UserServices();
    try {
      us.deleteUser(id);
      const filter = users.filter((user) => user.id !== id);
      setUsers(filter);
    } catch (err) {
      console.log(err);
    }
  };
  const onEdit = (id) => {
    navigate("/edit-user", { state: { id } });
  };
  const handleAddClick = () => {
    navigate("/add-new-user");
  };
  return (
    <>
      <div className="user-container">
        <h1>Users</h1>
        {err && <Error />}
        {users && (
          <Table
            header={headerUsers}
            data={users}
            onDelete={onDelete}
            onEdit={onEdit}
            btnText={"Add new user"}
            onAdd={handleAddClick}
            addBtn={true}
          />
        )}
      </div>
    </>
  );
}
