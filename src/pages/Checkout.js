import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"
import { config } from "../utils/axiosConfig"
import { createAnOrder } from "../features/user/userSlice";


const shippingSchema = yup.object({
  firstname: yup.string().required("First name is required!"),
  lastname: yup.string().required("Last name is required!"),
  address: yup.string().required("Address is required!"),
  city: yup.string().required("City is required!"),
  password: yup.string().required("Password is required!"),
  country: yup.string().required("Country is required!"),
  zipcode: yup.number().required("Zopcde is required!"),

});


const Checkout = () => {

  const dispatch = useDispatch();
  const cartState = useSelector(state => state.auth.cartProducts);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({paymongoPaymentId:"", paymongoOrderId:""})
  const [cartProductState, setCartProductState] = useState([])
  console.log(cartState);
  console.log(paymentInfo, shippingInfo)

  useEffect(() => {
    const calculateTotalAmount = () => {
        let sum = 0;
        cartState?.forEach(item => {
            sum += Number(item.quantity) * item.price;
        });
        setTotalAmount(sum);
    };
    calculateTotalAmount();
}, [cartState]);

const formik = useFormik({
  initialValues: {
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    password: "",
    country: "",
    zipcode: "",
    other: "",
  },
  validationSchema: shippingSchema,
  onSubmit: async (values) => {
    //alert(JSON.stringify(values))
    setShippingInfo()
    setTimeout(() => {
      checkOutHandler()
    }, 300)
  },
});

const loadScript =(src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

useEffect(() => {
  let items = []
  for (let index = 0; index < cartState?.length; index++) {
    items.push({
      //product: cartState[index].productId._id,
      quantity: cartState[index].quantity,
      color: cartState[index].color._id,
      price: cartState[index].price,
    })
  }
  setCartProductState(items)
}, [])
  
const checkOutHandler = async () => {
  const res = await loadScript("https://api.paymongo.com/v1/sources")
  if (!res) {
    alert("Paymongo SDK failed to load")
    return;
  }
  const result = await axios.post("http://locahost:5000/api/user/order/checkout", {amount: totalAmount+5}, config)
  if (!result) {
    alert("Something went wrong!")
    return;
  }
  const { amount, id: order_id, currency } = result.data.order
  console.log(result)
  const options = {
    key: "pk_test_ZUKykupbfcQR6Ny8uHmEq2Tm", // Enter the Key ID generated from the Dashboard
    amount: amount,
    currency: currency,
    name: "SupplySavvy",
    description: "Test Transaction",
    order_id: order_id,
    handler: async function (response) {
        const data = {
            orderCreationId: order_id,
            paymongoPaymentId: response.paymongo_payment_id,
            paymongoOrderId: response.paymongo_order_id,
        };

        const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);

        setPaymentInfo({
          paymongoPaymentId: response.paymongo_payment_id,
          paymongoOrderId: response.paymongo_order_id,
        })

        dispatch(createAnOrder({
          totalPrice:totalAmount, 
          totalPriceAfterDiscount:totalAmount,
          orderItems:cartProductState,
          paymentInfo,
          shippingInfo
        }))

        alert(result);

        },
        prefill: {
            name: "SupplySavvy",
            email: "alejandrorbillote@iskolarngbayan.pup.edu.ph",
            contact: "09511603983",
        },
        notes: {
            address: "SupplySavvy Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Paymongo(options);
    paymentObject.open();
  }

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-7">
              <div className="checkout-left-data">
                <h3 className="website-name">SupplySavvy</h3>
                <nav 
                    style={{ "--bs-breadcrumb-divider": ">"  }}
                    aria-label="breadcrumb">

                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link className="text-dark total-price" to="/cart">Cart</Link>
                            </li>
                            &nbsp; &gt;
                            <li className="breadcrumb-item total-price active" aria-current="page">
                                Information
                            </li>
                            &nbsp; &gt;
                            <li className="breadcrumb-item total-price active">
                                Shipping
                            </li>
                            &nbsp; &gt;
                            <li className="breadcrumb-item total-price active" aria-current="page">
                                Payment
                            </li>
                        </ol>
                </nav>
                <h4 className="title total">Contact Information</h4>
                <p className="user-details total">
                  Dru Gru (alejandrorbillote@iskolarngbayan.pup.edu.ph)
                </p>
                <h4 className="mb-3">Shipping Address</h4>
                <form onSubmit={formik.handleSubmit}
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      className="form-control form-select"
                      id=""
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      <option value="Philippines" >
                        Philippines
                      </option>
                    </select>
                    <div className="error ms-2 my-1">
                      {
                        formik.touched.country && formik.errors.country
                      }
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      name="firstname"
                      value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                      onBlur={formik.handleBlur("firstname")}
                    />
                    <div className="error ms-2 my-1">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>

                  
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      name="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                      onBlur={formik.handleBlur("lastname")}
                    />
                    <div className="error ms-2 my-1">
                      {
                        formik.touched.lastname && formik.errors.lastname
                      }
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Address"
                      className="form-control"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                    />
                    <div className="error ms-2 my-1">
                      {
                        formik.touched.address && formik.errors.address
                      }
                    </div>
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      placeholder="Apartment, Suite, etc. (optional)"
                      className="form-control"
                      name="other"
                      value={formik.values.other}
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                    />
                    <div className="error ms-2 my-1">
                      {
                        formik.touched.other && formik.errors.other
                      }
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="City"
                      className="form-control"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                    <div className="error ms-2 my-1">
                      {
                        formik.touched.city && formik.errors.city
                      }
                    </div>
                  </div>
                  
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      placeholder="Zipcode"
                      className="form-control"
                      name="zipcode"
                      value={formik.values.zipcode}
                      onChange={formik.handleChange("zipcode")}
                      onBlur={formik.handleBlur("zipcode")}
                    />
                    <div className="error ms-2 my-1">
                      {
                        formik.touched.zipcode && formik.errors.zipcode
                      }
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                      </Link>
                      <Link to="/cart" className="button">
                        Continue to Shipping
                      </Link>
                      <button className="button" type="submit" >PLACE ORDER</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className="border-bottom py-4">
                {
                  cartState && cartState?.map((item, index) => {
                    return (
                      <div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                          <div className="w-75 d-flex gap-10">
                            <div className="w-25 position-relative">
                              <span
                                style={{ top: "-10px", right: "2px" }}
                                className="style badge bg-secondary text-white rounded-circle p-2 position-absolute"
                              >
                                {item?.quantity}
                              </span>
                              <img
                                width={100}
                                height={100}
                                src={item?.productId?.images[0]?.url}
                                alt="product"
                              />
                            </div>
                            <div>
                              <h5 className="total-price">{item?.productId?.title}</h5>
                              <p className="total-price">{item?.color?.title}</p>
                            </div>
                          </div>
                      <div className="flex-grow-1">
                        <h5 className="total">₱ {item?.price * item?.quantity }</h5>
                      </div>
                    </div>
                    )
                  })
                }
                
              </div>
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total-price">Subtotal</p>
                  <p className="total-price">₱ {totalAmount?totalAmount:"0"}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total-price">Shipping</p>
                  <p className="mb-0 total-price">₱ 200</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">₱ {totalAmount?totalAmount+5:"0"}</h5>
              </div>
            </div>
          </div>
        </Container>
    </>
  );
};

export default Checkout;
