import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);
  return response.data;
};

const createBlog = async (blog) => {
  try {
    const response = await axios.post(`${base_url}blog/`, blog, config);
    return response.data;
  } catch (error) {
    // Return error response data directly
    throw error.response.data;
  }
};

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    blog.blogData,
    config
  );
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
