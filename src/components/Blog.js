import React, { useState } from "react";

const Blog = ({ blog, updateLikes }) => {
  const [detail, setDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleView = () => setDetails(!detail);

  const moreLikes = async () => {
    await updateLikes({ ...blog, likes: blog.likes + 1 });
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
      {blog.user.name}
    </div>
  );
};

export default Blog;
