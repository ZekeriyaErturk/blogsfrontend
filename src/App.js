import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const savedLogin = window.localStorage.getItem("LoggedUser");
    if (savedLogin) {
      const user = JSON.parse(savedLogin);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser("");
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    blogService.create(blog);
  };

  return (
    <div>
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
          <h2>blogs</h2>
          <p>{`${user.name} has logged in`}</p>{" "}
          <button onClick={handleLogout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <h2>Create New Blog</h2>
          <form onSubmit={handleCreate}>
            <div>
              <label htmlFor="title">title:</label>
              <input
                type="text"
                name="Title"
                id="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <label htmlFor="author">author:</label>
              <input
                type="text"
                name="Author"
                id="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>

            <div>
              <label htmlFor="url">url:</label>
              <input
                type="text"
                name="Url"
                id="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
