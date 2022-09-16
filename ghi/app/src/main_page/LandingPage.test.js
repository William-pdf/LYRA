import { render, screen } from "@testing-library/react";
import App from "../App";

// written by Deion
test("properly renders logo", () => {
  const { container } = render(<App />);
  const logo = container.querySelector(".lp_logo");
  expect(logo).toBeInTheDocument();
});
