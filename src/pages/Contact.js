import React from "react"
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";

const Contact = () => {
    return(
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
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="contact-inner-wrapper d-flex justify-content-between">
                                <div>
                                    <h3 className="contact-title mb-4">Contact</h3>
                                    <form action="" className="d-flex flex-column gap-15">
                                        <div>
                                            <input type="text" className="form-control" placeholder="Name" />
                                        </div>
                                        <div>
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div>
                                            <input type="tel" className="form-control" placeholder="Mobile Number" />
                                        </div>
                                        <div>
                                            <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder="Comments" ></textarea>
                                        </div>
                                        <div>
                                            <button className="button border-0">Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <div>
                                    <h3 className="contact-title mb-4">Get in touch with us</h3>
                                    <div>
                                        <ul className="ps-0">
                                            <li className="mb-3 d-flex gap-15 align-items-center"><AiOutlineHome className="fs-5" />
                                            <address className="mb-0">
                                            960, Aurora Boulevard, Quezon City, PH, 1109
                                            </address>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center"><BiPhoneCall className="fs-5" />
                                            <a href="tel:(02) 3-438-4580" >(02) 3-438-4580</a></li>
                                            <li className="mb-3 d-flex gap-15 align-items-center"><AiOutlineMail className="fs-5" />
                                            <a href="mailto:worldciticollegesqc.register@gmail.com">worldciticollegesqc.register@gmail.com</a>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center"><BiInfoCircle className="fs-5" />
                                            <p className="mb-0">Monday - Friday 8:30 AM - 5:30 AM</p>
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