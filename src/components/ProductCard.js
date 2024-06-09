import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = (props) => {
    const { grid, data = [] } = props; // Provide default value
    console.log(data); // Log data to check its value
    let location = useLocation();

    if (!Array.isArray(data)) {
        console.error("ProductCard: data is not an array", data);
        return <div>Error: Data is not an array</div>; // Render error message
    }

    return (
        <>
            {data.map((item, index) => {
                return(
                    <div 
                        key={index}
                        className={` ${
                        location.pathname === "/product" ? `gr-${grid}` : "col-3"
                    } `}
                    >
                        <Link to={`${
                            location.pathname == "/"
                                ? "/product/:id"
                                : location.pathname == "/product/:id"
                                ? "/product/1"
                                : ":id"
                            }`}
                            className="product-card position-relative"
                        >

                            <div className="wishlist-icon position-absolute">
                                <button className="border-0 bg-transparent">
                                    <img src={wish} alt="wishlist" />
                                </button>
                            </div>
                            <div className="product-image">
                                <img 
                                    src={item?.images[0].url} 
                                    className="img-fluid mx-auto" 
                                    alt="product image" 
                                    width={160}
                                />
                                <img 
                                    src={watch2} 
                                    className="img-fluid mx-auto" 
                                    alt="product image" 
                                    width={160}
                                />
                            </div>
                            <div className="product-details">
                                <h6 className="brand">{item?.brand}</h6>
                                <h5 className="product-title">{item?.title}</h5>
                                <ReactStars 
                                    count={5} 
                                    size={24} 
                                    value={item?.totalrating.toString()} 
                                    edit={false} 
                                    activeColor="#ffd700" 
                                />
                                <p 
                                    className={`description ${
                                        grid === 12 ? "d-block" : "d-none"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: item?.description }}
                                ></p>
                                <p className="price">₱{item?.price}</p>
                            </div>
                            <div className="action-bar position-absolute">
                                <div className="d-flex flex-column gap-15">
                                    <button className="border-0 bg-transparent">
                                        <img src={prodcompare} alt="compare" />
                                    </button>
                                    <button className="border-0 bg-transparent">
                                        <img src={view} alt="view" />
                                    </button>
                                    <button className="border-0 bg-transparent">
                                        <img src={addcart} alt="addcart" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </>
    );
};

export default ProductCard;