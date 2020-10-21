import React from "react";
import BlogForm from "./BlogForm";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

/*
  Make a test for the new blog form. The test should check, that the form calls the
  event handler it received as props with the right details when a new blog is created
*/
test("Check blogform props event fires when ne blog created", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = component.container.querySelector("#title");
  const inputAuthor = component.container.querySelector("#author");
  const inputUrl = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: "testing" },
  });
  fireEvent.change(inputAuthor, {
    target: { value: "test writer" },
  });
  fireEvent.change(inputUrl, {
    target: { value: "www.testing.com" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing");
  expect(createBlog.mock.calls[0][0].author).toBe("test writer");
  expect(createBlog.mock.calls[0][0].url).toBe("www.testing.com");
});
