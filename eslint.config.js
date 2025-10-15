import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
	js.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				document: "readonly",
				HTMLElement: "readonly",
				HTMLDivElement: "readonly",
				HTMLButtonElement: "readonly",
				HTMLInputElement: "readonly",
				window: "readonly",
				navigator: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
		},
	},
	{
		files: ["*.config.{ts,js}", "eslint.config.js"],
		languageOptions: {
			globals: {
				process: "readonly",
				__dirname: "readonly",
				__filename: "readonly",
			},
		},
	},
	{
		ignores: ["dist", "node_modules", "src-tauri/target"],
	},
];
