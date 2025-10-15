import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
	it("should render with children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole("button")).toHaveTextContent("Click me");
	});

	it("should handle click events", async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick}>Click me</Button>);

		await user.click(screen.getByRole("button"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Button disabled>Click me</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("should apply variant classes correctly", () => {
		render(<Button variant="destructive">Delete</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("bg-destructive");
	});
});
