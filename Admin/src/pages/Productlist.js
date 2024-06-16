import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts, resetState } from "../features/product/productSlice";
import { getColors } from "../features/color/colorSlice"; // Import the getColors action
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  { title: "Product No.", dataIndex: "key" },
  { title: "Title", dataIndex: "title", sorter: (a, b) => a.title.length - b.title.length },
  { title: "Brand", dataIndex: "brand", sorter: (a, b) => a.brand.length - b.brand.length },
  { title: "Category", dataIndex: "category", sorter: (a, b) => a.category.length - b.category.length },
  { title: "Color", dataIndex: "color" },
  { title: "Price", dataIndex: "price", sorter: (a, b) => a.price - b.price },
  { title: "Action", dataIndex: "action" },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
    dispatch(getColors()); // Fetch the colors data
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const colorState = useSelector((state) => state.color.colors); // Get the colors from the state
  
  const colorMap = colorState.reduce((acc, color) => {
    acc[color._id] = color.title;
    return acc;
  }, {});

  const data1 = productState.map((product, index) => ({
    key: index + 1,
    title: product.title,
    brand: product.brand,
    category: product.category,
    color: product.color.map((colorId) => colorMap[colorId]).join(", "), // Map color IDs to color names
    price: `${product.price}`,
    action: (
      <>
        <Link to={`/admin/product/${product._id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(product._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Product List</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProduct(productId)}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default Productlist;
