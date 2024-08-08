import UserServices from "../services/users.services";
import RolesServices from "../services/roles.services";
import GroupServices from "../services/groups.services";

export const createUser = async (userData) => {
  console.log(userData);
  const us = new UserServices();
  await us.create(userData);
};

export const createGroup = async (groupData) => {
  const gs = new GroupServices();
  await gs.create(groupData);
};
