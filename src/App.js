import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [color, setColor] = useState(null);

  // Get Blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Check for if user logged in previously
  useEffect(() => {
    const savedLogin = window.localStorage.getItem("LoggedUser");
    if (savedLogin) {
      const user = JSON.parse(savedLogin);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notificationHandler = (message, status) => {
    setErrorMessage(message);
    setColor(status);
    setTimeout(() => {
      setErrorMessage(null);
      setColor(null);
    }, 3000);
  };

  // Login User
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("LoggedUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      notificationHandler("login successful", "success");
      setUsername("");
      setPassword("");
    } catch (err) {
      notificationHandler("wrong username or password", "error");
    }
  };

  // Logout User
  const handleLogout = () => {
    window.localStorage.clear();
    setUser("");
  };

  // Create Blog
  const handleCreate = (blog) => {
    try {
      blogService.create(blog).then((blog) => setBlogs([...blogs, blog]));
      notificationHandler(
        `a new blog ${blog.title} by ${blog.author} added`,
        "success"
      );
    } catch (err) {
      notificationHandler("something went wrong", "error");
    }
  };

  // Update likes
  const handleLikes = async (blog) => {
    await blogService.updateBlog(blog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const blogForm = () => (
    <Toggleable buttonLabel="new note">
      <BlogForm createBlog={handleCreate} />
    </Toggleable>
  );

  return (
    <div>
      <Notification message={errorMessage} color={color} />
      {!user ? (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="Username"
              values={username}
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="Password"
              values={password}
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Create New Blog</h2>
          {blogForm()}
          <p>
            {`${user.name} has logged in`}
            <button onClick={handleLogout}>logout</button>
          </p>
          <h2>blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} updateLikes={handleLikes} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
