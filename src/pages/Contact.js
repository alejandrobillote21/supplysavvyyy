import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";

const contactSchema = yup.object({
  name: yup.string().required("Name is required!"),
  id_number: yup.string().required("ID no. is required!"),
  email: yup
    .string()
    .email("Email should be valid!")
    .required("Email is required!"),
  mobile: yup.string().nullable().required("Mobile no. is required!"),
  comment: yup.string().nullable().required("Comment is required!"),
});

const Contact = () => {
    const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      id_number: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery({
        name:values.name,
        id_number:values.id_number,
        email:values.email,
        mobile:values.mobile,
        comment:values.comment,
    }));
    },
  });

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15442.028042317215!2d121.05312273450473!3d14.627136923794987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7911fe205cb%3A0xdfb244aaf1f08808!2sWorld%20Citi%20Colleges%20Quezon%20City!5e0!3m2!1sen!2sph!4v1715201679415!5m2!1sen!2sph" 
              width="600" 
              height="450" 
              className="border-0 w-100"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Name" 
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    <div className="errors">
                      {formik.touched.name && formik.errors.name ? formik.errors.name : null}
                    </div>
                  </div>
                  <div>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="ID number"
                      name="id_number"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.id_number}
                    />
                    <div className="errors">
                      {formik.touched.id_number && formik.errors.id_number ? formik.errors.id_number : null}
                    </div> 
                  </div>
                  <div>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <div className="errors">
                      {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    </div> 
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="Mobile Number" 
                      name="mobile"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                    />
                    <div className="errors">
                      {formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : null}
                    </div> 
                  </div>
                  <div>
                    <textarea 
                      className="w-100 form-control" 
                      cols="30" 
                      rows="4" 
                      placeholder="Comments" 
                      name="comment"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                    ></textarea>
                    <div className="errors">
                      {formik.touched.comment && formik.errors.comment ? formik.errors.comment : null}
                    </div> 
                  </div>
                  <div>
                    <button className="button border-0" type="submit">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                        960, Aurora Boulevard, Quezon City, PH, 1109
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:(02) 3-438-4580">(02) 3-438-4580</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:worldciticollegesqc.register@gmail.com">worldciticollegesqc.register@gmail.com</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday - Friday 8:30 AM - 5:30 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
