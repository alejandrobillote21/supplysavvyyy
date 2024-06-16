import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

//const getProducts = async (userData) => {
//  try {
//    const response = await axios.get(`${base_url}product`, config());
//    return response.data;
//  } catch (error) {
//    throw new Error(error.response ? error.response.data.message : error.message);
//  }
//};

//const addToWishlist = async (prodId) => {
//  try {
//    const response = await axios.put(`${base_url}product/wishlist`, { prodId }, config());
//    return response.data;
//  } catch (error) {
//    throw new Error(error.response ? error.response.data.message : error.message);
//  }
//};

const getProducts = async (userData) => {
    const response = await axios.get(`${base_url}product`, config);
    if ( response.data) {
      return response.data
    }
};

const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${base_url}product/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(`${base_url}product/wishlist`,{prodId}, config);
  if ( response.data) {
    return response.data
  }
};


export const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
};
