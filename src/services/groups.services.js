import axios from "axios";

export default class GroupServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async getAllGroups() {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/groups`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async count() {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/groups/count`);
      return response.data.count[0].count;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteGroup(id) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.delete(
        `${this.baseUrl}/groups/${id}/delete`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async create(data) {
    const { name, roles, users, features } = data;
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.post(`${this.baseUrl}/groups/create`, {
        name,
        roles,
        users,
        features,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
  async update(data) {
    const { id, name, roles, users, features } = data;
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.put(`${this.baseUrl}/groups/${id}/update`, {
        name,
        roles,
        users,
        features,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
}
