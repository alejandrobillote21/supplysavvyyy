import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAInquiry,
  resetState,
  updateAInquiry,
} from "../features/inquiry/inquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewInq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getInqId = location.pathname.split("/")[3];
  const inqState = useSelector((state) => state.inquiry);
  const { inqName, inqMobile, inqEmail, inqComment, inqStatus } = inqState;

  useEffect(() => {
    dispatch(getAInquiry(getInqId));
  }, [getInqId]);
  const goBack = () => {
    navigate(-1);
  };
  const setInquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, inqData: e };
    dispatch(updateAInquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAInquiry(getInqId));
    }, 100);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Inquiry</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{inqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+63${inqMobile}`}>{inqMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{inqEmail}`}>{inqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{inqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{inqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={inqStatus ? inqStatus : "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) => setInquiryStatus(e.target.value, getInqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInq;