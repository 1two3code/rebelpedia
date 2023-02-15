import React from "react";
import { render, screen } from "@testing-library/react";
import Scrapyard from "./Scrapyard";

test("renders learn react link", () => {
  render(<Scrapyard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
