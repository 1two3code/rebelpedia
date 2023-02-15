import React from "react";
import { render, screen } from "@testing-library/react";
import Factory from "./Factory";

test("renders learn react link", () => {
  render(<Factory />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
