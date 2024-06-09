import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
    // Make sure to use FormData for file uploads
    const formData = new FormData();
    formData.append("file", data[0]); // Assuming only one file is uploaded
    const response = await axios.post(`${base_url}upload/`, formData, config);
    return response.data;
};

const deleteImg = async (id) => {
    const response = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
    return response.data;
};

const uploadService = {
    uploadImg,
    deleteImg,
};

export default uploadService;
