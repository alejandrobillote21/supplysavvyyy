import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { createNewblogCat, getABlogCat, resetState, updateABlogCat } from "../features/bcategory/bcategorySlice";

const schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const newBlogCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createBlogCategory, blogCatName, updatedBlogCategory, } = newBlogCategory;
  const getBlogCatId = location.pathname.split("/")[3];

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      toast.success("Blog Category Added Successfully!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfully!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createBlogCategory, blogCatName, updatedBlogCategory, ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, blogCatData: values };
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewblogCat(values));
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
          {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                  type="text" 
                  label="Enter Blog Category" 
                  name="title" 
                  onChng={formik.handleChange} 
                  onBlr={formik.handleBlur} 
                  val={formik.values.title} 
                  id="bCategory"
                />
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                  {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
                </button>
            </form>
        </div>
    </div>
  );
};

export default Addblogcat;