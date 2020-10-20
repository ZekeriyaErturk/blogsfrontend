import React, { useState } from "react";

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
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleView}>view</button>
    </div>
  ) : (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleView}>view</button> <br />
      {blog.url} <br />
      likes {blog.likes} <button onClick={moreLikes}>like</button>
      <br />
      {blog.user.name} <br />
      {userRemoveBtnCheck && <button onClick={deleteBlog}>remove</button>}
    </div>
  );
};

export default Blog;
