import axios from "axios";

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
