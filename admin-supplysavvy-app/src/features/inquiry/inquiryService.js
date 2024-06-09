import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getInquiries = async () => {
  const response = await axios.get(`${base_url}inquiry/`);

  return response.data;
};
const deleteInquiry = async (id) => {
  const response = await axios.delete(`${base_url}inquiry/${id}`, config);
  return response.data;
};
const getInquiry = async (id) => {
  const response = await axios.get(`${base_url}inquiry/${id}`);
  return response.data;
};
const udpateInquiry = async (inq) => {
  const response = await axios.put(
    `${base_url}inquiry/${inq.id}`,
    { status: inq.inqData },
    config
  );
  return response.data;
};
const inquiryService = {
  getInquiries,
  deleteInquiry,
  getInquiry,
  udpateInquiry,
};

export default inquiryService;
