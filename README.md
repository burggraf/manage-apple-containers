# MAC - Manage Apple Containers

A desktop application for managing Apple containers on macOS, built with Tauri, React, and TypeScript.

## Prerequisites

- **macOS 26 or higher** (required by Apple Container system)
- **Apple Silicon Mac** (ARM architecture required)
- **Node.js 18+** and npm
- **Rust toolchain** (latest stable)
- **Apple Container CLI** - Install from [github.com/apple/container](https://github.com/apple/container/releases)

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Library**: Shadcn UI + Tailwind CSS (Blueprint design)
- **Desktop Framework**: Tauri 2.x
- **Backend**: Rust
- **Testing**: Vitest + React Testing Library + Cargo Test

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mac
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the application in development mode:
```bash
npm run tauri dev
```

This will:
- Start the Vite development server with hot module replacement
- Launch the Tauri application window
- Enable React Fast Refresh for instant UI updates

### Building

Create a production build:
```bash
npm run tauri build
```

The built application will be available in `src-tauri/target/release/`.

## Available Scripts

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build locally

### Testing

- `npm test` - Run tests in watch mode
- `npm run test:watch` - Run tests with file watching
- `npm run test:ui` - Open Vitest UI for interactive testing
- `npm run test:coverage` - Generate test coverage report

### Code Quality

- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Fix auto-fixable ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

### Rust/Backend

```bash
cd src-tauri
cargo test      # Run Rust tests
cargo build     # Build Rust backend
cargo clippy    # Run Rust linter
```

## Project Structure

```
mac/
├── src/                      # Frontend source code
│   ├── components/           # React components
│   │   ├── ui/              # Shadcn UI components
│   │   ├── layout/          # Layout components (Header, Sidebar, etc.)
│   │   └── containers/      # Container-specific components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles and themes
│   ├── test/                # Test setup and utilities
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Vite entry point
│   └── index.css            # Global CSS with Tailwind directives
├── src-tauri/               # Rust backend
│   ├── src/
│   │   ├── main.rs          # Tauri app initialization
│   │   └── lib.rs           # Tauri command definitions
│   ├── Cargo.toml           # Rust dependencies
│   └── tauri.conf.json      # Tauri configuration
├── openspec/                # OpenSpec specifications and proposals
├── package.json             # Node.js dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── vitest.config.ts         # Vitest configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── components.json          # Shadcn UI configuration
├── .prettierrc              # Prettier configuration
├── eslint.config.js         # ESLint configuration
└── .editorconfig            # Editor configuration
```

## Development Workflow

### Test-Driven Development (TDD)

This project follows TDD practices. When adding new features:

1. **Write tests first**:
   ```typescript
   // src/components/MyComponent.test.tsx
   import { describe, it, expect } from "vitest";
   import { render, screen } from "@testing-library/react";
   import { MyComponent } from "./MyComponent";

   describe("MyComponent", () => {
     it("should render correctly", () => {
       render(<MyComponent />);
       expect(screen.getByText("Hello")).toBeInTheDocument();
     });
   });
   ```

2. **Run tests in watch mode**:
   ```bash
   npm run test:watch
   ```

3. **Implement the feature** to make the tests pass

4. **Refactor** while keeping tests green

### Adding New Components

1. **Add Shadcn UI components** (if needed):
   ```bash
   npx shadcn@latest add <component-name>
   ```

2. **Create component with test**:
   ```bash
   # Create component file
   touch src/components/MyComponent.tsx

   # Create test file
   touch src/components/MyComponent.test.tsx
   ```

3. **Use path aliases** for imports:
   ```typescript
   import { Button } from "@/components/ui/button";
   import { MyUtil } from "@/lib/utils";
   ```

### Code Style

- **Indentation**: Use tabs (4 spaces width)
- **Quotes**: Double quotes for strings
- **Semicolons**: Always required
- **Naming**:
  - Components: PascalCase (`ContainerList`)
  - Functions/variables: camelCase (`getUserData`)
  - Constants: UPPER_CASE (`MAX_CONTAINERS`)

Code formatting is enforced by Prettier. Run `npm run format` before committing.

## Testing Strategy

### Frontend Tests

- **Unit tests**: Test individual components and utilities
- **Integration tests**: Test component interactions
- **Coverage goal**: Aim for high code coverage

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx
```

### Backend Tests

- **Unit tests**: Test Tauri commands in isolation
- **Mocking**: Mock system calls where appropriate

```bash
cd src-tauri
cargo test
```

## Troubleshooting

### TypeScript Errors

If you see TypeScript errors after adding dependencies:
```bash
# Restart the TypeScript server in your editor
# Or rebuild the project
npm run build
```

### Tailwind Classes Not Working

Ensure your files are included in the Tailwind content configuration in `tailwind.config.js`:
```javascript
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

### Tests Failing

- Check that test setup is imported: `src/test/setup.ts`
- Verify vitest.d.ts is present for type definitions
- Run tests in isolation: `npm test -- <test-file>`

### Build Errors

- Clear dist and node_modules if needed:
  ```bash
  rm -rf dist node_modules
  npm install
  npm run build
  ```

## Contributing

1. Follow the TDD workflow
2. Run linters before committing:
   ```bash
   npm run lint
   npm run format
   npm test
   ```
3. Ensure all tests pass
4. Follow the project's code style conventions

## License

Open source project with no warranty.
