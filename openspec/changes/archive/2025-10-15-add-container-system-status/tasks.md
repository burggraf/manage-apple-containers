# Implementation Tasks

## 1. Backend - Rust Commands

- [x] 1.1 Add `check_container_system_status` Tauri command in `src-tauri/src/lib.rs`
  - Execute `container system status`
  - Parse output to detect "apiserver is not running" vs version info
  - Return `Result<String, String>` with status or error
- [x] 1.2 Add `start_container_system` Tauri command in `src-tauri/src/lib.rs`
  - Execute `echo "Y" | container system start` using shell piping
  - Capture output and any errors
  - Return `Result<String, String>`
- [x] 1.3 Register new commands in `invoke_handler` in `src-tauri/src/lib.rs`
- [x] 1.4 Write Rust unit tests for both commands
  - Test `check_container_system_status` with mocked output parsing
  - Test `start_container_system` return types

## 2. Frontend - System Startup Modal Component

- [x] 2.1 Create `src/components/system/SystemStartupModal.tsx`
  - Use Shadcn UI Dialog component (similar to `InstallationRequiredModal`)
  - Accept `isOpen`, `onStartSystem`, `onCancel` props
  - Display title, description, and action buttons
  - Support loading state and error message display
- [x] 2.2 Write tests for `SystemStartupModal.tsx`
  - Test modal renders with correct content
  - Test "Start System" button triggers callback
  - Test "Cancel" button triggers callback
  - Test loading state disables "Start System" button
  - Test error message display

## 3. Frontend - Application Startup Flow

- [x] 3.1 Add system status check logic to `src/App.tsx`
  - Add state for `showSystemStartupModal`, `isStartingSystem`, `startupError`
  - Modify `useEffect` to check system status after CLI check passes
  - Handle system status check failure by showing modal
- [x] 3.2 Implement system startup handler in `src/App.tsx`
  - Create `handleStartSystem` function that:
    - Sets loading state
    - Invokes `start_container_system`
    - On success, re-checks system status with `check_container_system_status`
    - Dismisses modal if verification succeeds
    - Shows error message if startup or verification fails
- [x] 3.3 Implement cancel handler in `src/App.tsx`
  - Create `handleCancelSystemStartup` function that exits the application
  - Use `exit(0)` from `@tauri-apps/plugin-process`
- [x] 3.4 Add `SystemStartupModal` component to JSX with appropriate props

## 4. Testing & Validation

- [ ] 4.1 Manual testing with system not running
  - Stop container system: `container system stop`
  - Launch application and verify modal appears
  - Click "Start System" and verify system starts
  - Verify modal dismisses and app proceeds normally
- [ ] 4.2 Manual testing with system already running
  - Ensure container system is running
  - Launch application and verify no modal appears
  - Verify app proceeds directly to main interface
- [ ] 4.3 Manual testing of cancel flow
  - Stop container system
  - Launch application
  - Click "Cancel" on modal and verify app exits cleanly
- [ ] 4.4 Manual testing of startup failure
  - Simulate a startup failure scenario (if possible)
  - Verify error message is displayed in modal
  - Verify user can retry or cancel
- [x] 4.5 Run all tests: `npm test` and `cd src-tauri && cargo test`
- [x] 4.6 Run linting and formatting checks

## 5. Documentation

- [x] 5.1 Update `CLAUDE.md` if needed to document new system status check behavior
- [x] 5.2 Update inline code comments for clarity
- [x] 5.3 Ensure error messages are user-friendly and actionable
