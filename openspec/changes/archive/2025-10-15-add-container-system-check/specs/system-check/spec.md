# System Check Capability

## ADDED Requirements

### Requirement: Container CLI Version Check

The system SHALL provide a mechanism to verify that the Apple Container CLI is installed and accessible on the host macOS system.

#### Scenario: Container CLI is installed

- **WHEN** the `check_container_version` command is invoked
- **AND** the `container` CLI tool is installed and in the system PATH
- **THEN** the command SHALL return success with the version string output

#### Scenario: Container CLI is not installed

- **WHEN** the `check_container_version` command is invoked
- **AND** the `container` CLI tool is not found in the system PATH
- **THEN** the command SHALL return an error indicating the tool is not installed

#### Scenario: Container CLI command fails

- **WHEN** the `check_container_version` command is invoked
- **AND** the `container` CLI tool exists but the `--version` flag fails
- **THEN** the command SHALL return an error with the failure details

### Requirement: System Check UI Verification

The application SHALL provide a temporary UI control to manually trigger the container system check for verification purposes.

#### Scenario: User triggers version check

- **WHEN** the user clicks the "Is container installed?" button
- **THEN** the application SHALL invoke the `check_container_version` command
- **AND** display the result (success with version or error message) to the user

#### Scenario: Version check shows success

- **WHEN** the version check succeeds
- **THEN** the UI SHALL display the container CLI version information

#### Scenario: Version check shows failure

- **WHEN** the version check fails
- **THEN** the UI SHALL display an appropriate error message indicating the container CLI is not available
