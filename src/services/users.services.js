import axios from "axios";

export default class UserServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async login({ email, password }) {
    const user = await axios.post(`${this.baseUrl}/login/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      email,
      password,
    });
    return user.data;
  }
  async getAllUsers() {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/users`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async deleteUser(id) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.delete(`${this.baseUrl}/users/${id}/delete`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async create(user) {
    const { email, password, roles, groups } = user;
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.post(`${this.baseUrl}/users/create`, {
        email,
        password,
        roles,
        groups,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async update(user) {
    const { id, email, roles, groups } = user;
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.put(`${this.baseUrl}/users/${id}/update`, {
        email,
        roles,
        groups,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
