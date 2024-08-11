import axios from "axios";
import RolesServices from "./roles.services";
import UserServices from "./users.services";
import GroupServices from "./groups.services";

export const getAllDataForEntities = async () => {
  const rs = new RolesServices();
  const us = new UserServices();
  const gs = new GroupServices();

  const [users, roles, groups] = await Promise.all([
    us.getAllUsers(),
    rs.getAllRoles(),
    gs.getAllGroups(),
  ]);
  const usersData = users.data.map((user) => ({
    id: user.id,
    name: user.name || user.email,
  }));
  const rolesData = roles.data.map((role) => ({
    id: role.id,
    name: role.name,
  }));
  const groupsData = groups.data.map((group) => ({
    id: group.id,
    name: group.name,
  }));
  return { users: usersData, roles: rolesData, groups: groupsData };
};

export const fetchEntity = async (showUsers, showGroups, showRoles, id) => {
  try {
    let url = "";
    if (!showUsers) {
      url = `users/${id}`;
    } else if (!showGroups) {
      url = `groups/${id}`;
    } else if (!showRoles) {
      url = `roles/${id}`;
    } else {
      return;
    }

    const response = await axios.get(`http://localhost:3000/${url}`);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
