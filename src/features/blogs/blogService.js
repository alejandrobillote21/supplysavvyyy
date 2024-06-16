// blogService.js
import axios from 'axios';
const base_url = 'http://localhost:5000'; // Ensure this is correct

export const getBlogs = async () => {
    const response = await axios.get(`${base_url}/api/blog`);
    return response.data;
};

export const getBlog = async (id) => {
    const response = await axios.get(`${base_url}/api/blog/${id}`);
    return response.data;
};

export const blogService = {
    getBlogs,
    getBlog,
};
