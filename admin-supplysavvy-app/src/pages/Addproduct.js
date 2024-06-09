import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts } from "../features/product/productSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  color: yup.array().required("Colors are Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories) || [];
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images) || [];

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      _id: i._id,
      color: i.title,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
    },
  });

  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  }

  const handleImageDelete = (image) => {
    dispatch(delImg(image.public_id)).then(() => {
      const filteredImages = images.filter(img => img.public_id !== image.public_id);
      setImages(filteredImages);
      formik.setFieldValue('images', filteredImages);
  });
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form 
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
            <CustomInput 
              type="text" 
              label="Enter Product Title" 
              name="title" 
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <div>
              <ReactQuill 
                theme="snow" 
                name="description" 
                onChange={formik.handleChange("description")}
                value={formik.values.description} 
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
              <CustomInput 
                type="number" 
                label="Enter Product Price" 
                name="price" 
                onChng={formik.handleChange("price")}
                onBlr={formik.handleBlur("price")}
                val={formik.values.price} 
              />
              <div className="error">
                {formik.touched.price && formik.errors.price}
              </div>
              <select 
                name="brand" 
                onChange={formik.handleChange("brand")}
                onBlur={formik.handleBlur("brand")}
                value={formik.values.brand} 
                className="form-control py-3 mb-3" 
                id=""
              >
                <option value="">Select Brand</option>
                {brandState.map((i, j) => {
                  return (
                    <option key = {j} value={i.title}>
                      {i.title}
                    </option>
                  );
                })}
              </select>
              <div className="error">
                {formik.touched.brand && formik.errors.brand}
              </div>
              <select 
                name="category" 
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                value={formik.values.category} 
                className="form-control py-3 mb-3" 
                id=""
              >
        
                <option value="">Select Category</option>
                {Array.isArray(catState) && catState.map((i, j) => (
                    <option key={j} value={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
              <div className="error">
                {formik.touched.category && formik.errors.category}
              </div>
              
              <Select 
                mode="multiple" 
                allowClear 
                className="w-100" 
                placeholder="Select Colors" 
                defaultValue={color} 
                onChange={(i) => handleColors(i)}
                options={coloropt}
              />

              <div className="error">
                {formik.touched.color && formik.errors.color}
              </div>
              <CustomInput 
                type="number" 
                label="Enter Product Quantity"
                name="quantity" 
                onChng={formik.handleChange("quantity")}
                onBlr={formik.handleBlur("quantity")}
                val={formik.values.quantity} 
              />
              <div className="error">
                {formik.touched.quantity && formik.errors.quantity}
              </div>
              <div className="bg-white border-1 p-5 text-center">
                <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;