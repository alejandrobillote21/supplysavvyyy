import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";

const columns = [
  { title: "Order No.", dataIndex: "key", },
  { title: "Student No.", dataIndex: "studentNo", },
  { title: "Name", dataIndex: "name", },
  { title: "Product", dataIndex: "product", },
  { title: "Address", dataIndex: "address", },
  { title: "Status", dataIndex: "status", },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    studentNo: "2021-13544-MN-0",
    name: `Dru Gru ${i}`,
    product: 32,
    address: `960 Aurora Boulevard Quezon City PH 1109`,
    status: `Sample ${i}`,
  });
}


const Dashboard = () => {

  const data = [
    { type: "January", sales: 38, },
    { type: "February", sales: 52, },
    { type: "March", sales: 61, },
    { type: "April", sales: 145, },
    { type: "May", sales: 48, },
    { type: "June", sales: 38, },
    { type: "July", sales: 38, },
    { type: "August", sales: 38, },
    { type: "September", sales: 38, },
    { type: "October", sales: 38, },
    { type: "November", sales: 38, },
    { type: "December", sales: 38, },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "top", // or "bottom", "left", "right"
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },     
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">₱10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To May 2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">₱10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To May 2024</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">₱10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To May 2024</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4 title">Income Statics</h3>
        <div>
          <Column {...config} style={{ fill: "#ffd333" }} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-4 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
