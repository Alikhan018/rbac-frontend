import UserServices from "../services/users.services";
import RolesServices from "../services/roles.services";
import GroupServices from "../services/groups.services";

export const createUser = async (userData) => {
  const us = new UserServices();
  await us.create(userData);
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
