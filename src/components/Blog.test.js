import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

// Make a test which checks that the component displaying a blog renders the blog's title and author
// but does not render its url or number of likes by default

test("Check if details hiden by default", () => {
  const blog = {
    title: "test",
    author: "test writer",
    url: "www.test.com",
    likes: 100,
    user: {
      name: "blog poster",
      username: "blogger",
    },
  };
  const component = render(<Blog blog={blog} />);

  const div = component.container.querySelector(".show");

  // Check for title
  expect(div).toHaveTextContent(blog.title);
  // Check for author
  expect(div).toHaveTextContent(blog.author);
  // Check for likes
  expect(div).not.toHaveTextContent(blog.likes);
  // Check for url
  expect(div).not.toHaveTextContent(blog.url);
});
