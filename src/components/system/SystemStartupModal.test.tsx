import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SystemStartupModal } from "./SystemStartupModal";

describe("SystemStartupModal", () => {
	it("renders with correct content when open", () => {
		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={false}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.getByText("Container System Not Running")).toBeInTheDocument();
		expect(
			screen.getByText(/The Apple Container system \(apiserver\) is not currently running/)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Would you like to start the container system now\?/)
		).toBeInTheDocument();
	});

	it("does not render when closed", () => {
		render(
			<SystemStartupModal
				isOpen={false}
				isLoading={false}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.queryByText("Container System Not Running")).not.toBeInTheDocument();
	});

	it("calls onStartSystem when Start System button is clicked", async () => {
		const onStartSystem = vi.fn();
		const user = userEvent.setup();

		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={false}
				error={null}
				onStartSystem={onStartSystem}
				onCancel={vi.fn()}
			/>
		);

		const startButton = screen.getByRole("button", { name: /Start System/i });
		await user.click(startButton);

		expect(onStartSystem).toHaveBeenCalledTimes(1);
	});

	it("calls onCancel when Cancel button is clicked", async () => {
		const onCancel = vi.fn();
		const user = userEvent.setup();

		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={false}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={onCancel}
			/>
		);

		const cancelButton = screen.getByRole("button", { name: /Cancel/i });
		await user.click(cancelButton);

		expect(onCancel).toHaveBeenCalledTimes(1);
	});

	it("disables Start System button when loading", () => {
		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={true}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		const startButton = screen.getByRole("button", { name: /Starting.../i });
		expect(startButton).toBeDisabled();
	});

	it("disables Cancel button when loading", () => {
		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={true}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		const cancelButton = screen.getByRole("button", { name: /Cancel/i });
		expect(cancelButton).toBeDisabled();
	});

	it("shows loading text when isLoading is true", () => {
		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={true}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.getByText("Starting container system...")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /Starting.../i })).toBeInTheDocument();
	});

	it("displays error message when error is provided", () => {
		const errorMessage = "Failed to start the container system";

		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={false}
				error={errorMessage}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.getByText("Failed to start system:")).toBeInTheDocument();
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it("does not display error section when error is null", () => {
		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={false}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.queryByText("Failed to start system:")).not.toBeInTheDocument();
	});

	it("shows exit warning message", () => {
		render(
			<SystemStartupModal
				isOpen={true}
				isLoading={false}
				error={null}
				onStartSystem={vi.fn()}
				onCancel={vi.fn()}
			/>
		);

		expect(screen.getByText(/The application will exit if you cancel/)).toBeInTheDocument();
	});
});
