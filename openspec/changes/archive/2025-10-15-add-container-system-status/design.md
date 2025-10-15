# Design: Container System Status Check

## Context

The application already checks whether the Container CLI is installed at startup. However, having the CLI installed doesn't guarantee the container system (apiserver) is running. Operations will fail with unclear errors if the system isn't started. This enhancement adds proactive detection and user-assisted startup.

## Goals / Non-Goals

**Goals:**
- Detect when container system is not running
- Provide clear user feedback about system state
- Allow users to start the system from within the app
- Verify successful startup after user action
- Maintain consistent UX with existing InstallationRequiredModal

**Non-Goals:**
- Automatic startup without user consent (system may have been intentionally stopped)
- Periodic polling or background monitoring of system status
- Managing system configuration or advanced troubleshooting

## Decisions

### Decision 1: Sequential startup checks

The application will perform checks in this order:
1. Check if Container CLI is installed
2. If CLI is installed, check if system is running
3. Only proceed to main app if both checks pass

**Rationale:** This provides clear, progressive feedback. If CLI is missing, there's no point checking system status since the system command won't be available.

### Decision 2: Parse output for status detection

The `container system status` command returns different output based on system state:
- Running: Returns version information (e.g., "apiserver version: 1.0.0")
- Not running: Returns "apiserver is not running and not registered with launchd"

We'll check the output content to determine state rather than relying solely on exit codes.

**Rationale:** Exit codes may not reliably indicate all states. Output parsing provides more explicit state information.

### Decision 3: Use echo piping for auto-confirmation

The `container system start` command requires interactive confirmation. We'll use `echo "Y" | container system start` to automatically confirm.

**Rationale:** The user has already consented by clicking "Start System" in the modal. Requiring them to interact with a terminal would be poor UX in a GUI application.

### Decision 4: Re-verify after startup

After running the start command, we'll run `container system status` again to verify the system is actually running before dismissing the modal.

**Rationale:** The start command may succeed but the system might fail to start. Verification ensures we don't leave the user in an ambiguous state.

### Decision 5: Separate modal component

Create a new `SystemStartupModal` component rather than extending `InstallationRequiredModal`.

**Rationale:** While similar in structure, the modals serve different purposes and have different actions. Separation keeps components focused and easier to maintain.

## Implementation Pattern

### Rust Backend

Add two new commands to `src-tauri/src/lib.rs`:

```rust
#[tauri::command]
fn check_container_system_status() -> Result<String, String> {
    // Execute `container system status`
    // Parse output to determine if running
    // Return Ok(output) if running, Err(message) if not
}

#[tauri::command]
fn start_container_system() -> Result<String, String> {
    // Execute `echo "Y" | container system start`
    // Return Ok(output) on success, Err(message) on failure
}
```

### Frontend Flow

In `src/App.tsx`, after the CLI installation check:

```typescript
useEffect(() => {
    const checkSystem = async () => {
        // 1. Check CLI installation (existing code)
        try {
            await invoke("check_container_version");
        } catch (error) {
            if (error.includes("not found")) {
                setShowInstallModal(true);
                return; // Don't proceed to system check
            }
        }

        // 2. Check system status (new code)
        try {
            await invoke("check_container_system_status");
        } catch (error) {
            setShowSystemStartupModal(true);
        }
    };

    checkSystem();
}, []);
```

### Modal Component

`src/components/system/SystemStartupModal.tsx`:
- Display explanation of the issue
- "Start System" button that:
  1. Shows loading state
  2. Invokes `start_container_system`
  3. On success, invokes `check_container_system_status` to verify
  4. Dismisses modal if verification succeeds
  5. Shows error if startup or verification fails
- "Cancel" button that exits the application

## Risks / Trade-offs

**Risk:** The `echo "Y"` piping approach may not work with all shell configurations or future CLI versions.
- **Mitigation:** Test thoroughly. If it fails, document the limitation and fall back to instructing user to run the command manually in terminal.

**Risk:** System startup may take several seconds, during which the UI could appear frozen.
- **Mitigation:** Show clear loading state with descriptive text ("Starting container system...")

**Trade-off:** Requiring user action to start vs auto-starting.
- **Chosen:** Require user action. Users may have intentionally stopped the system, and auto-starting without consent could interfere with their workflow.

## Migration Plan

This is a new feature with no migration needed. Existing users will simply see the new checks on their next app launch.

## Open Questions

**Q:** Should we provide an option to "Don't check again" for advanced users who prefer to manage the system themselves?
**A:** Not in initial implementation. Can be added later if users request it.

**Q:** Should the modal provide more detailed troubleshooting steps if startup fails?
**A:** Start simple with just the error message. Can enhance with troubleshooting links if user feedback indicates it's needed.
