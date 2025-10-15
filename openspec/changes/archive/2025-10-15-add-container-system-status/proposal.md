# Add Container System Status Check

## Why

While the application currently checks if the Container CLI is installed, it does not verify whether the container system (apiserver) is actually running. A user may have the CLI installed but the service not started, which will cause container operations to fail with cryptic errors. Users need proactive detection of an inactive apiserver with an option to start it before attempting operations.

## What Changes

- Add `check_container_system_status` Tauri command that runs `container system status`
- Parse the status output to determine if apiserver is running or not registered with launchd
- If system is not running, show a modal dialog offering to start the service
- Add `start_container_system` Tauri command that runs `echo "Y" | container system start` with user consent
- Re-check system status after starting to verify successful startup
- Integrate system status check into application startup flow after CLI installation check

## Impact

- **Affected specs:** `system-check` (modified capability)
- **Affected code:**
  - `src-tauri/src/lib.rs` - New Tauri commands for status check and system start
  - `src/App.tsx` - Enhanced startup flow with system status verification
  - New modal component for system startup prompt (e.g., `SystemStartupModal.tsx`)
  - `InstallationRequiredModal.tsx` may serve as a pattern reference
