import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumb from '../components/BreadCrumb';
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const [productUpdateDetail, setProductUpdateDetail] = useState(null);
    const userCartState = useSelector(state => state.auth.cartProducts);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    useEffect(() => {
        if (productUpdateDetail) {
            dispatch(updateCartProduct(productUpdateDetail));
            setTimeout(() => {
                dispatch(getUserCart());
            }, 200);
        }
    }, [productUpdateDetail, dispatch]);

    const handleDeleteCartProduct = (id) => {
        dispatch(deleteCartProduct(id));
        setTimeout(() => {
            dispatch(getUserCart());
        }, 200);
    };

    const handleUpdateCartProduct = (cartItemId, quantity) => {
        setProductUpdateDetail({ cartItemId, quantity });
    };

    useEffect(() => {
        const calculateTotalAmount = () => {
            let sum = 0;
            userCartState?.forEach(item => {
                sum += Number(item.quantity) * item.price;
            });
            setTotalAmount(sum);
        };
        calculateTotalAmount();
    }, [userCartState]);

    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-content-center">
                            <h4 className="cart-col-1">Product</h4>
                            <h4 className="cart-col-2">Price</h4>
                            <h4 className="cart-col-3">Quantity</h4>
                            <h4 className="cart-col-4">Total</h4>
                        </div>
                        {userCartState && userCartState.map((item, index) => {
                            const productTitle = item?.product?.title || "Unknown Product";
                            const productColor = item?.color || "Unknown Color";
                            return (
                                <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                                        <div className="w-25">
                                            <img 
                                                src={watch} 
                                                className="img-fluid" 
                                                alt="product image" 
                                            />
                                        </div>
                                        <div className="w-75">
                                            <p>{productTitle}</p>
                                            <p>Size: Medium</p>
                                            <p className="d-flex gap-3">Color:
                                                <ul className="colors ps-0">
                                                    <li 
                                                        style={{ backgroundColor: productColor }}>
                                                    </li>
                                                </ul>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="cart-col-2">
                                        <h5 className="price">₱ {item?.price}</h5>
                                    </div>
                                    <div className="cart-col-3 d-flex align-items-center gap-15">
                                        <div>
                                            <input 
                                                className="form-control" 
                                                type="number" 
                                                min={1} 
                                                max={10} 
                                                value={productUpdateDetail?.cartItemId === item._id ? productUpdateDetail.quantity : item.quantity} 
                                                onChange={(e) => handleUpdateCartProduct(item._id, e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <AiFillDelete onClick={() => handleDeleteCartProduct(item._id)} className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="cart-col-4">
                                        <h5 className="price">₱ {item.price * item.quantity}</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/product" className="button">
                                Continue to Shopping
                            </Link>
                            {(totalAmount !== 0) && (
                                <div className="d-flex flex-column align-items-end">
                                    <h4>SubTotal: ₱ {totalAmount}</h4>
                                    <p>Taxes and shipping calculated at checkout</p>
                                    <Link to="/checkout" className="button">
                                        Checkout
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Cart;
