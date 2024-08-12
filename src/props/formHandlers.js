import UserServices from "../services/users.services";
import RolesServices from "../services/roles.services";
import GroupServices from "../services/groups.services";

export const createUser = async (userData) => {
  const us = new UserServices();
  const matchPassword = us.matchPassword(userData);
  if (matchPassword) {
    await us.create(userData);
    return "user created";
  }
  return "Not matched";
};
export const updateUser = async (userData) => {
  const us = new UserServices();
  await us.update(userData);
};

export const createGroup = async (groupData) => {
  const gs = new GroupServices();
  await gs.create(groupData);
};
export const updateGroup = async (groupData) => {
  const gs = new GroupServices();
  await gs.update(groupData);
};

export const createRole = async (roleData) => {
  const rs = new RolesServices();
  await rs.create(roleData);
};
export const updateRole = async (roleData) => {
  const rs = new RolesServices();
  await rs.update(roleData);
};

export const changePasswordForUser = async (data, id) => {
  const us = new UserServices();
  const res = await us.changePasswordForUser(data, id);
  return res;
};
