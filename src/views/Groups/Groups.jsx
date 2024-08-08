import React, { useState, useEffect } from "react";
import GroupServices from "../../services/groups.services";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import { headerGroups } from "../../props/tables";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const gs = new GroupServices();
      try {
        const response = await gs.getAllGroups();
        setGroups(response.data);
        setErr(false);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
    getData();
  }, []);
  const onDelete = (id) => {
    const gs = new GroupServices();
    try {
      gs.deleteGroup(id);
      const filter = groups.filter((group) => group.id !== id);
      setGroups(filter);
    } catch (err) {
      console.log(err);
    }
  };
  const onEdit = (id) => {
    navigate("/edit-group");
  };
  const handleAddClick = () => {
    navigate("/add-new-group");
  };
  return (
    <>
      <div className="user-container">
        <h1>Groups</h1>
        {err && <Error />}
        {groups && (
          <Table
            header={headerGroups}
            data={groups}
            onDelete={onDelete}
            onEdit={onEdit}
            btnText={"Add new group"}
            onAdd={handleAddClick}
            addBtn={true}
          />
        )}
      </div>
    </>
  );
}
