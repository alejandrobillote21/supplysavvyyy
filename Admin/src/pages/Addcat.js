import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { createCategory, getAProductCategory, resetState, updateAProductCategory } from "../features/pcategory/pcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, isLoading, createdCategory, categoryName, updatedCategory } = newCategory;
  const getPCatId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");
      dispatch(resetState());
    }
    if (isSuccess && updatedCategory) {
      toast.success("Brand Category Updated Successfully!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, createdCategory, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) { 
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
      }
    },
  });
    

  return (
    <div>
      <h3 className="mb-4 title">
        {getPCatId !== undefined ? "Edit" : "Add"} Product Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput 
            type="text" 
            label="Enter Product Category"
            name="title"
            onChng={formik.handleChange} 
            onBlr={formik.handleBlur} 
            val={formik.values.title} 
            id="title"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
          {getPCatId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
