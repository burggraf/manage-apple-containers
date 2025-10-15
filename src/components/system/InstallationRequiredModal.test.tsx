import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InstallationRequiredModal } from "./InstallationRequiredModal";

// Mock the Tauri shell plugin
vi.mock("@tauri-apps/plugin-shell", () => ({
	open: vi.fn().mockResolvedValue(undefined),
}));

describe("InstallationRequiredModal", () => {
	it("should render when isOpen is true", () => {
		render(<InstallationRequiredModal isOpen={true} onClose={() => {}} />);

		expect(
			screen.getByText("Apple Container CLI Required"),
		).toBeInTheDocument();
	});

	it("should not render when isOpen is false", () => {
		render(<InstallationRequiredModal isOpen={false} onClose={() => {}} />);

		expect(
			screen.queryByText("Apple Container CLI Required"),
		).not.toBeInTheDocument();
	});

	it("should display explanation text about the dependency requirement", () => {
		render(<InstallationRequiredModal isOpen={true} onClose={() => {}} />);

		expect(
			screen.getByText(/Apple Container CLI is required/i),
		).toBeInTheDocument();
		expect(screen.getByText(/cannot operate without it/i)).toBeInTheDocument();
	});

	it("should display exit notice text", () => {
		render(<InstallationRequiredModal isOpen={true} onClose={() => {}} />);

		expect(
			screen.getByText(/application will exit when you close this dialog/i),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Please restart after installing the CLI/i),
		).toBeInTheDocument();
	});

	it("should render GitHub releases link button", () => {
		render(<InstallationRequiredModal isOpen={true} onClose={() => {}} />);

		const linkButton = screen.getByRole("button", {
			name: /Open GitHub Releases Page/i,
		});
		expect(linkButton).toBeInTheDocument();
	});

	it("should render Close button", () => {
		render(<InstallationRequiredModal isOpen={true} onClose={() => {}} />);

		const closeButtons = screen.getAllByRole("button", { name: /^Close$/i });
		// Find the main close button (has w-full class)
		const mainCloseButton = closeButtons.find((btn) =>
			btn.classList.contains("w-full"),
		);
		expect(mainCloseButton).toBeInTheDocument();
	});

	it("should call onClose when Close button is clicked", async () => {
		const user = userEvent.setup();
		const mockOnClose = vi.fn();

		render(<InstallationRequiredModal isOpen={true} onClose={mockOnClose} />);

		const closeButtons = screen.getAllByRole("button", { name: /^Close$/i });
		// Find the main close button (has w-full class)
		const mainCloseButton = closeButtons.find((btn) =>
			btn.classList.contains("w-full"),
		);
		expect(mainCloseButton).toBeDefined();
		await user.click(mainCloseButton!);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("should attempt to open GitHub releases page when link button is clicked", async () => {
		const user = userEvent.setup();
		const { open } = await import("@tauri-apps/plugin-shell");

		render(<InstallationRequiredModal isOpen={true} onClose={() => {}} />);

		const linkButton = screen.getByRole("button", {
			name: /Open GitHub Releases Page/i,
		});
		await user.click(linkButton);

		expect(open).toHaveBeenCalledWith(
			"https://github.com/apple/container/releases/latest",
		);
	});

	it("should handle error when opening link fails", async () => {
		const user = userEvent.setup();
		// eslint-disable-next-line no-undef
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const { open } = await import("@tauri-apps/plugin-shell");

		// Make open fail for this test
		vi.mocked(open).mockRejectedValueOnce(new Error("Failed to open URL"));

		render(<InstallationRequiredModal isOpen={true} onClose={() => {}} />);

		const linkButton = screen.getByRole("button", {
			name: /Open GitHub Releases Page/i,
		});
		await user.click(linkButton);

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Failed to open GitHub releases page:",
			expect.any(Error),
		);

		consoleErrorSpy.mockRestore();
	});
});
