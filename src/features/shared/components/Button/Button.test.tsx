import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    render(<Button children="Click Me" variant="primary" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    const { container } = render(
      <Button children="Primary" variant="primary" />
    );
    expect(container.firstChild).toHaveClass("primary");
  });

  it("handles the onClick event", () => {
    const handleClick = vi.fn();
    render(
      <Button children="Click Me" variant="primary" onClick={handleClick} />
    );
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the button as disabled", () => {
    render(<Button children="Disabled" variant="primary" disabled={true} />);
    const buttonElement = screen.getByText(/Disabled/i);
    expect(buttonElement).toBeDisabled();
  });
});
