import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : "";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : "";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
    return response.data;
  } catch (error) {
    // Handle errors here
    throw error;
  }
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
