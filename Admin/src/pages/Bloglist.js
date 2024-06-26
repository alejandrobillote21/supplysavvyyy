import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  { title: "Serial No.", dataIndex: "key" },
  { title: "Title", dataIndex: "name" },
  { title: "Category", dataIndex: "category" },
  { title: "Action", dataIndex: "action" },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);

  const getBlogState = useSelector((state) => state.blogs.blogs);

  const data1 = getBlogState.map((blog, index) => ({
    key: index + 1,
    name: blog.title,
    category: blog.category,
    action: (
      <>
        <Link to={`/admin/blog/${blog.id}`} className="fs-3 text-danger">
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(blog._id)}
        >
          <AiFillDelete />
        </button>
      </>
    ),
  }));

  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteBlog = (id) => {
    dispatch(deleteABlog(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <Table columns={columns} dataSource={data1} />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBlog(blogId)}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default Bloglist;
