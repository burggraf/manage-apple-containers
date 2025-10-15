<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MAC (Manage Apple Containers) is a Tauri 2.x desktop application for managing Apple containers on macOS. It uses React 19 + TypeScript for the frontend and Rust for the backend.

**Requirements:**
- macOS 26+ (required by Apple Container system)
- Apple Silicon Mac (ARM architecture)
- Node.js 18+ and Rust toolchain
- Apple Container CLI must be installed separately

## Common Commands

### Development
```bash
npm run tauri dev          # Start dev mode with hot reload
npm run dev                # Start only Vite dev server (port 1420)
```

### Testing
```bash
npm test                   # Run tests in watch mode
npm test -- Button.test.tsx  # Run specific test file
npm run test:ui            # Open Vitest interactive UI
npm run test:coverage      # Generate coverage report

cd src-tauri && cargo test # Run Rust backend tests
```

### Code Quality
```bash
npm run lint               # Check for ESLint issues
npm run lint:fix           # Auto-fix ESLint issues
npm run format             # Format with Prettier
npm run format:check       # Check formatting

cd src-tauri && cargo clippy  # Rust linter
```

### Building
```bash
npm run tauri build        # Production build (output: src-tauri/target/release/)
npm run build              # Build frontend only
```

## Architecture

### Frontend (React + TypeScript)
- **Component Library:** Shadcn UI with Tailwind CSS (Blueprint design system)
- **Path Aliases:** Use `@/` prefix for imports (e.g., `@/components/ui/button`)
- **Component Structure:**
  - `src/components/ui/` - Shadcn UI primitives (button, card, input, etc.)
  - `src/components/layout/` - Layout components (Layout, Header, Sidebar, MainContent)
  - `src/components/containers/` - Container management components
- **Testing:** Vitest + React Testing Library, test files use `.test.tsx` suffix
- **Styling:** Tailwind CSS with custom configuration, tabs for indentation (4 space width)

### Backend (Tauri + Rust)
- **Main Entry:** `src-tauri/src/main.rs` calls `tauri_app_lib::run()`
- **Commands:** Defined in `src-tauri/src/lib.rs` with `#[tauri::command]` attribute
- **Invoking Commands:** Use `invoke_handler(tauri::generate_handler![command_name])`
- **Library Name:** `tauri_app_lib` (note the `_lib` suffix to avoid Windows name conflicts)

### Tauri Frontend-Backend Communication
Frontend calls Rust commands using Tauri's invoke API. Commands are registered in the `invoke_handler` in `src-tauri/src/lib.rs`. Example pattern:
```rust
#[tauri::command]
fn my_command(arg: &str) -> String {
    // implementation
}
```

### Vite Configuration
- **Dev Server Port:** 1420 (strict, will fail if unavailable)
- **HMR Port:** 1421
- **Path Resolution:** `@` alias points to `./src`
- Vite ignores watching `src-tauri` directory

## Development Practices

### Test-Driven Development (TDD)
This project follows TDD. Write tests first, then implement features. Tests should be co-located with components using `.test.tsx` suffix.

### Adding Shadcn UI Components
```bash
npx shadcn@latest add <component-name>
```
Components are installed to `src/components/ui/` with corresponding Tailwind config.

### Code Style
- **Indentation:** Tabs (4 space width)
- **Quotes:** Double quotes
- **Semicolons:** Required
- **Naming:**
  - Components: PascalCase (`ContainerList`)
  - Functions/variables: camelCase (`getUserData`)
  - Constants: UPPER_CASE (`MAX_CONTAINERS`)
