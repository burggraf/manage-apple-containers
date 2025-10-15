# Implementation Tasks

## 1. Backend Implementation

- [x] 1.1 Add `check_container_version` Tauri command in `src-tauri/src/lib.rs`
- [x] 1.2 Implement shell command execution using `std::process::Command`
- [x] 1.3 Handle success case: parse and return version output
- [x] 1.4 Handle error cases: command not found, execution failure
- [x] 1.5 Register the new command in the Tauri invoke handler
- [x] 1.6 Write Rust unit tests for `check_container_version` command

## 2. Frontend Implementation

- [x] 2.1 Add "Is container installed?" button to `src/App.tsx` dashboard
- [x] 2.2 Import and use Tauri's `invoke` API in the component
- [x] 2.3 Create click handler to call `check_container_version` command
- [x] 2.4 Add state management for version check result
- [x] 2.5 Display result message (success with version or error) in the UI
- [x] 2.6 Add appropriate styling for success/error states

## 3. Testing and Validation

- [ ] 3.1 Manual test: Run with container CLI installed - verify version is displayed
- [ ] 3.2 Manual test: Temporarily rename/move container CLI - verify error message
- [ ] 3.3 Verify error handling shows user-friendly messages
- [ ] 3.4 Run `npm run tauri dev` and verify button functionality
- [x] 3.5 Run Rust tests with `cd src-tauri && cargo test`
