import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  { title: "Order No.", dataIndex: "key", },
  { title: "ID Number", dataIndex: "id_number", },
  { title: "Product Name", dataIndex: "name", },
  { title: "Brand", dataIndex: "brand", },
  { title: "Count", dataIndex: "count", },
  { title: "Color", dataIndex: "color", },
  { title: "Amount", dataIndex: "amount", },
  { title: "Date", dataIndex: "date",},
  { title: "Action", dataIndex: "action",},
];

const ViewOrder = () => {
const location = useLocation();
const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const orderState = useSelector((state) => state.auth.orderbyuser[0]);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      id_number: orderState[i].products.orderby.id_number,
      name: orderState[i].products.product.title,
      brand: orderState[i].products.brand.title,
      count: orderState[i].products.product.count,
      amount: orderState[i].products.product.price,
      color: orderState[i].products.product.color,
      date: orderState[i].products.product.createdAt,

      /*name: `${orderState[i].orderby.firstname} ${orderState[i].orderby.lastname}`, // Concatenate first name and last name
      /*product: (
        <Link to={`/admin/order/${orderState[i].orderby._id}`}>
          View User Order
        </Link>
      ),
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),*/

      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
        <div>
            <Table columns={columns} dataSource={data1} />
        </div>
    </div>
  );
};

export default ViewOrder;