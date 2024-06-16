import React, { useEffect, useState } from "react";

import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAInquiry,
  getInquiries,
  resetState,
  updateAInquiry,
} from "../features/inquiry/inquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  { title: "Inquiry No.", dataIndex: "key", },
  { title: "ID Number", dataIndex: "id_number" },
  { title: "Name", dataIndex: "name", },
  { title: "Email", dataIndex: "email", },
  { title: "Mobile", dataIndex: "mobile", },
  { title: "Status", dataIndex: "status", },
  { title: "Action", dataIndex: "action", },
];

const Inquiries = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [inqId, setinqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setinqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getInquiries());
  }, []);
  const inqState = useSelector((state) => state.inquiry.inquiries);
  const data1 = [];
  for (let i = 0; i < inqState.length; i++) {
    data1.push({
      key: i + 1,
      id_number: inqState[i].id_number,
      name: inqState[i].name,
      email: inqState[i].email,
      mobile: inqState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={inqState[i].status ? inqState[i].status : "Submitted"}
            className="form-control form-select"
            id=""
            onChange={(e) => setInquiryStatus(e.target.value, inqState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),

      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/inquiries/${inqState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(inqState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setInquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, inqData: e };
    dispatch(updateAInquiry(data));
  };
  const deleteInq = (e) => {
    dispatch(deleteAInquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getInquiries());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Inquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteInq(inqId);
        }}
        title="Are you sure you want to delete this inquiry?"
      />
    </div>
  );
};

export default Inquiries;