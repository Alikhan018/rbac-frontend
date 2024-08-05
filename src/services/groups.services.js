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
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
