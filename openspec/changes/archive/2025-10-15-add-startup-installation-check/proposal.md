# Proposal: Add Startup Installation Check

**Change ID:** `add-startup-installation-check`
**Status:** Draft
**Created:** 2025-10-15

## Overview

Add automatic container system installation checking on application startup. When the Apple Container CLI is not detected, display a modal dialog directing users to install it from the official release page.

## Problem Statement

Currently, the application includes a manual "System Check" button that users can click to verify container CLI installation. However:

1. **No automatic detection** - Users must manually trigger the check, which may not happen until they encounter errors
2. **Poor discoverability** - New users may not understand why container operations fail
3. **Missing installation guidance** - Error messages don't provide a clear path to resolve the issue

This creates a poor first-run experience for users who haven't yet installed the required Apple Container CLI dependency.

## Proposed Solution

Enhance the existing `system-check` capability with automatic startup verification:

1. **Automatic startup check** - Run `check_container_version` when the application launches
2. **Installation guidance modal** - Display a modal dialog when CLI is not found, including:
   - Clear explanation of the requirement
   - Direct link to https://github.com/apple/container/releases/latest
   - Simple "Close" button
3. **Hard dependency enforcement** - Exit the application immediately when user closes the modal, as the app cannot function without the container CLI

## Capabilities Affected

- **MODIFIED**: `system-check` - Add automatic startup checking and installation guidance UI

## Implementation Strategy

This change builds upon the existing `check_container_version` Tauri command infrastructure. Implementation involves:

1. Create a startup check dialog component with installation instructions
2. Add useEffect hook in App.tsx to trigger check on mount
3. Display modal with link to releases page when CLI not found
4. Exit application using Tauri's process API when user closes the modal

## Success Criteria

- Application automatically checks for container CLI on startup
- Missing CLI triggers a modal with clear installation instructions
- Modal includes working link to https://github.com/apple/container/releases/latest
- Application exits cleanly when user closes the modal
- Successful check allows normal app functionality to proceed

## Dependencies

- Requires existing `check_container_version` Tauri command (already implemented)
- Requires Shadcn UI Dialog component (may need to be added via `npx shadcn@latest add dialog`)

## Risks & Mitigations

**Risk:** Hard exit might be jarring for users who don't understand the requirement
**Mitigation:** Provide very clear, friendly explanation in the modal that the CLI is required for the app to function

**Risk:** Link might become outdated if Apple changes release structure
**Mitigation:** Use /latest redirect which is more stable than version-specific URLs

**Risk:** Users might be frustrated by needing to restart after installation
**Mitigation:** This is acceptable - installing a system dependency typically requires this workflow

## Decisions Made

1. **Hard dependency enforcement** - App will exit if CLI not installed (no "explore anyway" option)
2. **No retry mechanism** - User must install CLI and restart the app manually
3. **Simple modal** - Just installation instructions and link, no complex retry logic

## Related Changes

None - this is a standalone enhancement to improve first-run experience.
