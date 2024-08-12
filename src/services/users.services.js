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
      const response = await axios.get(`${this.baseUrl}/users/count`);
      return response.data.count[0].count;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUser(id) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.delete(`${this.baseUrl}/users/${id}/delete`);
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
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  matchPassword(data) {
    if (data.password !== data.password_two) {
      return false;
    }
    return true;
  }
  async changePasswordForUser(data, id) {
    try {
      const res = this.matchPassword(data);
      if (res) {
        const newPassword = data.password;
        const response = await axios.put(
          `${this.baseUrl}/users/${id}/changepassword`,
          {
            newPassword,
          }
        );
        return response.data;
      }
      return "Not matched";
    } catch (err) {
      return err;
    }
  }
}
