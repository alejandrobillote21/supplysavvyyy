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

    const imgState = useSelector((state) => state.upload.images) || [];
    const bCatState = useSelector((state) => state.bCategory.bCategories) || [];
    const blogState = useSelector((state) => state.blogs);
    const { isSuccess, isError, createdBlog, updatedBlog, blogName, blogDesc, blogCategory, blogImages } = blogState;

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfully!");
            navigate("/admin/blog-list");
        }
        if (isSuccess && updatedBlog) {
            toast.success("Blog Updated Successfully!");
            navigate("/admin/blog-list");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdBlog, updatedBlog, navigate]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || "",
            description: blogDesc || "",
            category: blogCategory || "",
            images: blogImages || [],
        },
        validationSchema: schema,
        onSubmit: (values) => {
            values.images = images;  // Add uploaded images to formik values
            if (getBlogId) {
                dispatch(updateABlog({ id: getBlogId, blogData: values }));
            } else {
                dispatch(createBlogs(values));
            }
            dispatch(resetState());
        },
    });    

    const handleImageUpload = (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('images', file);
        });
    
        dispatch(uploadImg(formData)).then((response) => {
            console.log('Upload Response:', response);  // Log the response for debugging
    
            if (response.payload && response.payload.length > 0) {
                const uploadedImages = response.payload.map(img => ({
                    public_id: img.public_id,
                    url: img.url,
                }));
                setImages([...images, ...uploadedImages]);
                formik.setFieldValue('images', [...images, ...uploadedImages]);
            } else {
                console.error('Upload failed or no images returned:', response.payload);
            }
        });
    };    

    const handleImageDelete = (image) => {
        dispatch(delImg(image.public_id)).then(() => {
            const filteredImages = images.filter(img => img.public_id !== image.public_id);
            setImages(filteredImages);
            formik.setFieldValue('images', filteredImages);
        });
    };    

    useEffect(() => {
        if (blogImages && blogImages.length) {
            setImages(blogImages);
        }
    }, [blogImages]);

    return (
        <div>
            <h3 className="mb-4 title">{getBlogId ? "Edit" : "Add"} Blog</h3>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput
                    type="text"
                    label="Enter Blog Title"
                    name="title"
                    onChng={formik.handleChange}
                    onBlr={formik.handleBlur}
                    val={formik.values.title}
                />
                <div className="error">{formik.touched.title && formik.errors.title}</div>
                <select
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    className="form-control py-3 mt-3"
                >
                    <option value="">Select Blog Category</option>
                    {bCatState.map((cat, index) => (
                        <option key={index} value={cat.title}>{cat.title}</option>
                    ))}
                </select>
                <div className="error">{formik.touched.category && formik.errors.category}</div>
                <ReactQuill
                    theme="snow"
                    className="mt-3"
                    value={formik.values.description}
                    onChange={value => formik.setFieldValue('description', value)}
                />
                <div className="error">{formik.touched.description && formik.errors.description}</div>
                <Dropzone onDrop={handleImageUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="bg-white border-1 p-5 text-center mt-3">
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>

                <div className="image-preview mt-3" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                        <div key={index} className="image-item" style={{ marginRight: '10px', marginBottom: '10px' }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={image.url}
                                    alt="uploaded"
                                    className="img-fluid"
                                    style={{ width: '300px', height: '300px' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        padding: '2px',
                                        borderRadius: 'none',
                                        backgroundColor: 'transparent', // Remove background color
                                        color: 'gray', // Gray color for the icon
                                        border: 'none',
                                    }}
                                    onClick={() => handleImageDelete(image)}
                                >
                                    <FontAwesomeIcon icon={faTimes} style={{ fontSize: '20px' }} /> {/* Adjust the font size */}
                                </button>
                            </div>
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
