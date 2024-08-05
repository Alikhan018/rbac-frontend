import axios from "axios";

export default class RolesServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async getAllRoles() {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/roles`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async deleteRole(id) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.delete(`${this.baseUrl}/roles/${id}/delete`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
