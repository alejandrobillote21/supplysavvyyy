import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createBlogs, getABlog, updateABlog } from "../features/blogs/blogSlice";
import { getCategories, resetState } from "../features/bcategory/bcategorySlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[3];
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (getBlogId) {
            dispatch(getABlog(getBlogId));
        } else {
            dispatch(resetState());
        }
    }, [dispatch, getBlogId]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const imgState = useSelector((state) => state.upload.images);
    const blogState = useSelector((state) => state.blogs);
    const bCategoryState = useSelector((state) => state.bCategory.bCategories);

    useEffect(() => {
        if (blogState.isSuccess && blogState.createdBlog) {
            toast.success('Blog Added Successfully!');
            navigate('/admin/blog');
        }
        if (blogState.isSuccess && blogState.updatedBlog) {
            toast.success('Blog Updated Successfully!');
            navigate('/admin/blog-list');
        }
        if (blogState.isError) {
            toast.error('Something went wrong!');
        }
    }, [blogState, navigate]);

    const formik = useFormik({
        initialValues: {
            title: blogState.blogName || "",
            description: blogState.blogDescription || "",
            category: blogState.blogCategory || "",
            images: blogState.blogImages || [],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBlogId) {
                dispatch(updateABlog({ id: getBlogId, blogData: values }));
            } else {
                dispatch(createBlogs(values));
                formik.resetForm();
                setImages([]);
            }
        },
    });

    useEffect(() => {
        formik.setFieldValue("images", images);
    }, [images]);

    const handleImageUpload = (acceptedFiles) => {
        dispatch(uploadImg(acceptedFiles)).then((action) => {
            if (action.error) {
                const errorMessage = action.error.message || 'Error uploading images';
                console.error(errorMessage);
                toast.error(errorMessage);
            } else {
                const uploadedImages = action.payload;
                setImages([...images, ...uploadedImages]);
            }
        });
    };
    

    const handleImageDelete = (publicId) => {
        dispatch(delImg(publicId)).then(() => {
            setImages(images.filter((img) => img.public_id !== publicId));
        });
    };

    return (
        <div>
            <h3 className="mb-4 title">{getBlogId ? "Edit" : "Add"} Blog</h3>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput
                    type="text"
                    label="Enter Blog Title"
                    name="title"
                    onChng={formik.handleChange("title")}
                    onBlr={formik.handleBlur("title")}
                    val={formik.values.title}
                />
                <div className="error">{formik.touched.title && formik.errors.title}</div>
                <ReactQuill
                    theme="snow"
                    name="description"
                    value={formik.values.description}
                    onChange={(value) => formik.setFieldValue("description", value)}
                />
                <div className="error">{formik.touched.description && formik.errors.description}</div>
                <select
                    name="category"
                    onChange={formik.handleChange("category")}
                    onBlur={formik.handleBlur("category")}
                    value={formik.values.category}
                    className="form-control py-3 mb-3"
                >
                    <option value="">Select Blog Category</option>
                    {bCategoryState.map((item) => (
                        <option key={item._id} value={item.title}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <div className="error">{formik.touched.category && formik.errors.category}</div>
                <div className="bg-white border-1 p-5 text-center">
                    <Dropzone onDrop={handleImageUpload}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="showingimages d-flex flex-wrap gap-3">
                    {images.map((img, index) => (
                        <div className="position-relative" key={index}>
                            <button
                                type="button"
                                onClick={() => handleImageDelete(img.public_id)}
                                className="btn-close position-absolute"
                                style={{ top: "10px", right: "10px" }}
                            ></button>
                            <img src={img.url} alt="" width={200} height={200} />
                        </div>
                    ))}
                </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                    {getBlogId ? "Edit" : "Add"} Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
