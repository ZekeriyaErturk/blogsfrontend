import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const res = await axios.post(baseUrl, newBlog, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateBlog = async (Blog) => {
  try {
    const res = await axios.put(`${baseUrl}/${Blog.id}`, Blog);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default { getAll, create, setToken, updateBlog };
