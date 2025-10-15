# Project Context

## Purpose

MAC (Manage Apple Containers) is a desktop application for managing Apple containers on macOS. It provides a graphical interface to interact with Apple's container system, making it easier to manage containers, images, and related operations.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **UI Framework:** Shadcn UI with Tailwind CSS (Blueprint design system)
- **Desktop Framework:** Tauri 2.x
- **Backend:** Rust
- **Testing:** Vitest, React Testing Library, Cargo test

## Project Conventions

### Code Style

- **Indentation:** Tabs (4 space width)
- **Quotes:** Double quotes
- **Semicolons:** Required
- **Naming:**
  - Components: PascalCase (`ContainerList`)
  - Functions/variables: camelCase (`getUserData`)
  - Constants: UPPER_CASE (`MAX_CONTAINERS`)
- **Path Aliases:** Use `@/` prefix for imports (e.g., `@/components/ui/button`)

### Architecture Patterns

- **Frontend-Backend Communication:** Tauri invoke API
  - Frontend calls Rust commands using `invoke()`
  - Rust commands decorated with `#[tauri::command]`
  - Commands registered in `invoke_handler`
- **Component Structure:**
  - `src/components/ui/` - Shadcn UI primitives
  - `src/components/layout/` - Layout components
  - `src/components/containers/` - Domain-specific components
- **Library Name:** `tauri_app_lib` (note the `_lib` suffix)

### Testing Strategy

- **Test-Driven Development (TDD):** Write tests first, then implement
- **Frontend Tests:** Co-located with components using `.test.tsx` suffix
- **Backend Tests:** Rust unit tests in `src-tauri/src/` modules
- **Test Commands:**
  - `npm test` - Frontend tests (watch mode)
  - `npm run test:coverage` - Coverage report
  - `cd src-tauri && cargo test` - Backend tests

### Git Workflow

[To be documented as team practices emerge]

## Domain Context

- **Apple Containers:** macOS containerization system requiring macOS 26+ and Apple Silicon
- **Container CLI:** External Apple CLI tool (`container` command) must be installed separately
- The application acts as a GUI wrapper around the container CLI

## Important Constraints

- **Platform:** macOS 26+ required
- **Architecture:** Apple Silicon (ARM) only
- **External Dependency:** Apple Container CLI must be pre-installed
- **Dev Server Port:** Vite uses port 1420 (strict, will fail if unavailable)

## External Dependencies

- **Apple Container CLI:** System-level command-line tool for container management
- **Node.js:** 18+ required for frontend development
- **Rust Toolchain:** Required for Tauri backend compilation
