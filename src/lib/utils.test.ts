import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
	it("should merge class names correctly", () => {
		const result = cn("btn", "btn-primary");
		expect(result).toBe("btn btn-primary");
	});

	it("should handle conditional classes", () => {
		const shouldHide = false;
		const result = cn("btn", shouldHide && "hidden", "btn-primary");
		expect(result).toBe("btn btn-primary");
	});

	it("should merge tailwind classes correctly", () => {
		const result = cn("px-2 py-1", "px-4");
		// tailwind-merge should keep only the last px- class
		expect(result).toBe("py-1 px-4");
	});
});
