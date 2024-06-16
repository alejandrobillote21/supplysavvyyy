import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const postQuery = async (contactData) => {
  try {
    const response = await axios.post(`${base_url}inquiry`, contactData, config());
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const contactService = {
  postQuery,
};
