# Add Container System Check

## Why

The application requires the Apple Container CLI (`container` command) to be installed on the user's macOS system to function properly. Currently, there is no mechanism to verify whether this critical dependency is available before attempting container operations. Users need immediate feedback on whether their system is properly configured.

## What Changes

- Add Rust command to execute shell commands and capture output/errors
- Create `check_container_version` Tauri command that runs `container --version`
- Add frontend functionality to invoke the container version check
- Add temporary UI button "Is container installed?" to the main dashboard for testing
- Establish error handling pattern for system command execution

## Impact

- **Affected specs:** `system-check` (new capability)
- **Affected code:**
  - `src-tauri/src/lib.rs` - New Tauri commands
  - `src/App.tsx` - Temporary button for testing
  - New Rust dependencies may be required for process execution
