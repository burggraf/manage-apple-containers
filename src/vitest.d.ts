import "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface Assertion<T = unknown>
		extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface AsymmetricMatchersContaining extends TestingLibraryMatchers {}
}
