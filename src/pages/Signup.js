import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from '../components/BreadCrumb';
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { registerUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const signUpSchema = yup.object({
  id_number: yup.string().required("ID no. is required!"),
  firstname: yup.string().required("First name is required!"),
  lastname: yup.string().required("Last name is required!"),
  email: yup
  .string()
  .email("Email should be valid!")
  .required("Email is required!"),
  mobile: yup.string().required("Moble no. is required!"),
  password: yup.string().required("Password is required!"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      id_number: "",
      firstname: '',
      lastname: '',
      email: '',
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      //alert(JSON.stringify(values, null, 2))
    },
  });

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
        
      <Container class1="login-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Sign Up</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  
                  <CustomInput 
                    type="text" 
                    name="id_number" 
                    placeholder="ID Number" 
                    className="form-control" 
                    value = {formik.values.id_number}
                    onChange = {formik.handleChange("id_number")}
                    onBlur = {formik.handleBlur("id_number")}
                    />
                    <div className="error">
                      {formik.touched.id_number && formik.errors.id_number}
                    </div>
                  <CustomInput 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    className="form-control" 
                    value = {formik.values.firstname}
                    onChange = {formik.handleChange("firstname")}
                    onBlur = {formik.handleBlur("firstname")}
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <CustomInput 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    className="form-control" 
                    value = {formik.values.lastname}
                    onChange = {formik.handleChange("lastname")}
                    onBlur = {formik.handleBlur("lastname")}
                    />
                    <div className="error">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  <CustomInput 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    className="form-control" 
                    value = {formik.values.email}
                    onChange = {formik.handleChange("email")}
                    onBlur = {formik.handleBlur("email")}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  <CustomInput 
                    type="tel" name="mobileNumber" 
                    placeholder="Mobile Number" 
                    className="form-control" 
                    value = {formik.values.mobile}
                    onChange = {formik.handleChange("mobile")}
                    onBlur = {formik.handleBlur("mobile")}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  <CustomInput 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value = {formik.values.password}
                    onChange = {formik.handleChange("password")}
                    onBlur = {formik.handleBlur("password")}
                    />
                    <div className="error">
                      {formik.touched.password && formik.errors.password}
                    </div>
                  <div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">Sign Up</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
    </>
  );
};

export default Signup;
