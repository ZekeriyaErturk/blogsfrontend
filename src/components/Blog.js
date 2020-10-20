import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [detail, setDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return !detail ? (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setDetails(!detail)}>view</button>
    </div>
  ) : (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setDetails(!detail)}>view</button> <br />
      {blog.url} <br />
      likes {blog.likes} <br />
      {blog.user.name}
    </div>
  );
};

export default Blog;
