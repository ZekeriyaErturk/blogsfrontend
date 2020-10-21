import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("Check if details hiden by default", () => {
  // Disable warning for PropTypes
  console.error = jest.fn();

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

  const div = component.container.querySelector(".show-details");

  // Check for title
  expect(div).toHaveTextContent(blog.title);
  // Check for author
  expect(div).toHaveTextContent(blog.author);
  // Check for likes
  expect(div).not.toHaveTextContent(blog.likes);
  // Check for url
  expect(div).not.toHaveTextContent(blog.url);
});

test("Check if details shown when button clicked", () => {
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

  const button = component.container.querySelector("button");
  fireEvent.click(button);

  const div = component.container.querySelector(".hide-details");

  expect(div).toHaveTextContent(blog.likes);
  expect(div).toHaveTextContent(blog.url);
});

test("Check if like button handler called twice", () => {
  const like = jest.fn();

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

  const component = render(<Blog blog={blog} updateLikes={like} />);

  const button = component.getByText("show");
  fireEvent.click(button);

  const likeButton = component.container.querySelector(".like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(like.mock.calls).toHaveLength(2);
});
