# system-check Specification Delta

## Purpose

Extends the `system-check` capability to provide automatic container CLI verification on application startup and user-friendly installation guidance when the CLI is not found.

## ADDED Requirements

### Requirement: Automatic Startup Installation Check

The application SHALL automatically verify container CLI installation when it launches and enforce the dependency as a hard requirement.

#### Scenario: Application starts with container CLI installed

- **WHEN** the application launches
- **AND** the `check_container_version` command succeeds
- **THEN** the application SHALL proceed to normal operation without showing any installation prompts

#### Scenario: Application starts without container CLI installed

- **WHEN** the application launches
- **AND** the `check_container_version` command fails with "not found" error
- **THEN** the application SHALL display an installation guidance modal dialog
- **AND** the modal SHALL include a clear explanation that the Apple Container CLI is required for the application to function
- **AND** the modal SHALL include a clickable link to https://github.com/apple/container/releases/latest
- **AND** the modal SHALL provide a "Close" button
- **AND** the modal SHALL not be dismissible by clicking outside or pressing escape

#### Scenario: User clicks the installation link

- **WHEN** the installation guidance modal is displayed
- **AND** the user clicks the GitHub releases link
- **THEN** the application SHALL open the URL in the user's default browser
- **AND** the modal SHALL remain visible

#### Scenario: User closes the modal without installing

- **WHEN** the installation guidance modal is displayed
- **AND** the user clicks the "Close" button
- **THEN** the application SHALL exit immediately and cleanly
- **AND** SHALL not leave any background processes running

### Requirement: Installation Guidance UI Components

The application SHALL provide a modal dialog component specifically for guiding users through container CLI installation.

#### Scenario: Modal displays installation instructions

- **WHEN** the installation guidance modal is shown
- **THEN** the modal SHALL display a clear title (e.g., "Apple Container CLI Required")
- **AND** SHALL include descriptive text explaining that the CLI is required for the application to function
- **AND** SHALL display the GitHub releases link as a clickable, visually distinct element
- **AND** SHALL show a single "Close" action button
- **AND** SHALL use appropriate Shadcn UI Dialog components for consistent styling
- **AND** SHALL not be dismissible via overlay click or escape key

#### Scenario: Modal communicates application exit behavior

- **WHEN** the installation guidance modal is shown
- **THEN** the modal SHALL clearly communicate that the application will exit when closed
- **AND** SHALL provide instructions to restart the application after installing the CLI

## REMOVED Requirements

### Requirement: System Check UI Verification

The temporary UI control for manually triggering the container system check has been removed as it is no longer needed with automatic startup checking.

## Dependencies

- Leverages existing `check_container_version` Tauri command from `system-check` capability
- Requires Shadcn UI Dialog component
- Uses Tauri's shell plugin (`@tauri-apps/plugin-shell`) for opening external URLs
- Uses Tauri's process API (`@tauri-apps/plugin-process`) for application exit
