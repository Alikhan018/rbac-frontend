import UserServices from "../services/users.services";
import RolesServices from "../services/roles.services";
import GroupServices from "../services/groups.services";

export const createUser = async (userData) => {
  const us = new UserServices();
  const res = await us.create(userData);
  console.log(res);
};

export const createGroup = async(groupData) => {
    const rs = new RolesServices();
    const res = await rs.create(groupData);
}
