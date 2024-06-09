import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from '../components/BreadCrumb';
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from 'react-image-zoom';

import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
const SingleProduct = () => {
    const props = {
      width: 400, 
      height: 600, 
      zoomWidth: 600, 
      
      img: "https://media.karousell.com/media/photos/products/2022/9/9/wcc_shs_uniform_1662729457_9af95e4e_progressive.jpg"
    };

    const [orderedProduct, setorderedProduct] = useState(true);
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
      }
    return (
        <>
            <Meta title={"Product Name"} />
            <BreadCrumb title="Product Name" />

            <Container class1="main-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex flex-wrap gap-15">
                        <div>
                            <img src="https://media.karousell.com/media/photos/products/2022/9/9/wcc_shs_uniform_1662729457_9af95e4e_progressive.jpg" alt="" className="img-fluid"/>
                        </div>
                        <div>
                            <img src="https://media.karousell.com/media/photos/products/2022/9/9/wcc_shs_uniform_1662729457_9af95e4e_progressive.jpg" alt="" className="img-fluid"/>
                        </div>
                        <div>
                            <img src="https://media.karousell.com/media/photos/products/2022/9/9/wcc_shs_uniform_1662729457_9af95e4e_progressive.jpg" alt="" className="img-fluid"/>
                        </div>
                        <div>
                            <img src="https://media.karousell.com/media/photos/products/2022/9/9/wcc_shs_uniform_1662729457_9af95e4e_progressive.jpg" alt="" className="img-fluid"/>
                        </div>
                        </div>
                    </div>
                    <div className="col-6">
                    <div className="main-product-details">
                        <div className="border-bottom">
                            <h3 className="title">WCC Uniform</h3>
                        </div>
                        <div className="border-bottom py-3">
                            <p className="price">₱ 100.00</p>
                            <div className="d-flex align-items-center gap-10">
                                <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                                <p className="mb-0 t-review">(2 Reviews)</p>
                            </div>
                            <a className="review-btn" href="#review">Write a Review</a>
                        </div>
                        <div className="py-3">
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Type :</h3>
                                <p className="product-data">Uniform</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Brand :</h3>
                                <p className="product-data">WCC Uniform</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Category :</h3>
                                <p className="product-data">Uniform</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Tags :</h3>
                                <p className="product-data">Uniform</p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-2">
                                <h3 className="product-heading">Availability :</h3>
                                <p className="product-data">In Stock</p>
                            </div>
                            <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                <h3 className="product-heading">Size :</h3>
                                <div className="d-flex flex-wrap gap-15">
                                    <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">L</span>
                                    <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                </div>
                            </div>
                            <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                <h3 className="product-heading">Color :</h3>
                                <Color />
                            </div>
                            <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                <h3 className="product-heading">Quantity :</h3>
                                <div className="">
                                    <input
                                    type="number"
                                    name=""
                                    min={1}
                                    max={10}
                                    className="form-control"
                                    style={{ width: "70px" }}
                                    id=""
                                    />
                                </div>
                                <div className="d-flex align-items-center gap-30 ms-5">
                                    <button className="button border-0" type="submit">ADD TO CART</button>
                                    <button className="button signup">Buy It Now</button>
                                </div>
                            </div>
                                <div className="d-flex align-items gap-15">
                                <div>
                                    <a href=""> <TbGitCompare className="fs-5 me-2" />
                                    Add to Compare</a>
                                </div>
                                <div>
                                    <a href="">
                                    <AiOutlineHeart className="fs-5 me-2" />
                                    Add to Wishlist</a>
                                </div>
                                </div>
                                <div className="d-flex gap-10 flex-column my-3">
                                <h3 className="product-heading">Shippings & Returns</h3>
                                <p className="product-data">Free shipping and returns available on all orders! <br/>We ship nationwide orders within <b>5-10 business days!</b>
                                </p>
                            </div>
                            <div className="d-flex gap-10 align-items-center my-3">
                                <h3 className="product-heading">Product Link</h3>
                                <a 
                                    href="javascript:void(0);"
                                    onClick={() => {
                                        copyToClipboard("https://media.karousell.com/media/photos/products/2022/9/9/wcc_shs_uniform_1662729457_9af95e4e_progressive.jpg");
                                    }}>
                                        Copy Product Link
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </Container>

            <Container class1="description-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className="bg-white p-3">
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </p>
                            </div>
                        </div>
                    </div>
            </Container>

            <Container class1="reviews-wrapper home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 id="review" >Reviews</h3>
                            <div className="review-inner-wrapper">
                                <div className="review-head d-flex justify-content-between align-items-end">
                                    <div>
                                        <h4 className="mb-2">Customer Reviews</h4>
                                        <div className="d-flex align-items-center gap-10">
                                            <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                                            <p className="mb-0">Based on 2 Reviews</p>
                                        </div>
                                    </div>
                                    {orderedProduct && (
                                        <div>
                                            <a className="text-dark text-decoration-underline" href=""> Write a Review</a>
                                        </div>
                                    )}
                                </div>
                                <div className="review-form py-4">
                                    <h4>Write a Review</h4>
                                    <form action="" className="d-flex flex-column gap-15">
                                        <div>
                                            <ReactStars count={5} size={24} value={4} edit={true} activeColor="#ffd700" />
                                        </div>
                                        <div>
                                            <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder="Comments" ></textarea>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className="button border-0">Submit Review</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="reviews mt-4">
                                    <div className="review">
                                        <div className="d-flex gap-10 align-items-center">
                                            <h6 className="mb-0">Dru Gru</h6>
                                            <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                                        </div>
                                        <p className="mt-3">
                                            I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living.
                                            <br />Mahilig ako sa walang kabuluhan, ito'y nagigising sa mga selula ng utak. Ang pantasya ay isang kinakailangang sangkap sa buhay.
                                            <br />我喜欢胡说八道，它能唤醒脑细胞。幻想是生活中必不可少的成分。
                                            <br />أحب السخافة، فهي توقظ خلايا الدماغ. الخيال هو مكون ضروري في الحياة.
                                            <br />私はナンセンスが好きです、それは脳細胞を目覚めさせます。ファンタジーは生きる上で必要不可欠な要素です。
                                            <br />Мне нравится бессмыслица, она разбудит клетки мозга. Фантазия необходимый ингредиент в жизни.
                                            <br />나는 허황된 이야기를 좋아해요, 그것이 뇌세포를 깨워줍니다. 환상은 삶에 필수적인 재료입니다
                                            <br />Pidän hölynpölystä, se herättää aivosolut. Fantasia on elämässä välttämätön ainesosa.
                                            <br />Szeretem a nonszenszt, ez felébreszti az agysejteket. A fantázia nélkülözhetetlen összetevő az életben.
                                            <br />Akeedgo baahne' doo bił hólǫ́. Haʼátʼíísh bínaʼnilzinígíí dóó tó áłtsʼíísííł.
                                            <br />Lubię nonsens, budzi to komórki mózgowe. Fantazja jest niezbędnym składnikiem życia.
                                            <br />ฉันชอบสิ่งไร้สาระ เพราะมันทำให้เซลล์สมองตื่นขึ้น และจินตนาการเป็นส่วนสำคัญของการดำรงชีวิต.
                                            <br />𒀭𒈹 𒀜𒍑𒉿𒊑𒈬𒁇𒆠 𒂊𒁇𒋛𒀭𒉿𒈬 𒂊𒋫 𒈗𒆤𒄑𒉡 𒅎𒋫𒀀𒉿𒈨𒌋𒋛𒁇𒆠𒂗𒈨 𒄑𒈬𒈬𒁀𒀀𒁇𒉣𒉿. 𒈗𒆤𒄑𒉡 𒅎𒋫 𒆳𒉿𒍑𒍑𒈬𒁀𒂊𒍑𒆠𒀀𒁇𒉣𒉿.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Container>

            <Container class1="popular-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Our Popular Products</h3>
                        </div>
                    </div>
                    <div className="row">
                        <ProductCard />
                    </div>
            </Container>
        </>
    );
};

export default SingleProduct;
