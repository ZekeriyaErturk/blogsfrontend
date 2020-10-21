import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLikes, userName, handleDelete }) => {
  const [detail, setDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const userRemoveBtnCheck = blog.user.name === userName;

  const handleView = () => setDetails(!detail);

  const moreLikes = () => {
    updateLikes({ ...blog, likes: blog.likes + 1 });
  };

  const deleteBlog = () => {
    handleDelete(blog);
  };

  return !detail ? (
    <div style={blogStyle} className="show">
      {blog.title} {blog.author} <button onClick={handleView}>show</button>
    </div>
  ) : (
    <div style={blogStyle} className="hide">
      {blog.title} {blog.author}
      <button onClick={handleView}>hide</button> <br />
      {blog.url} <br />
      likes {blog.likes} <button onClick={moreLikes}>like</button>
      <br />
      {blog.user.name} <br />
      {userRemoveBtnCheck && <button onClick={deleteBlog}>remove</button>}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
