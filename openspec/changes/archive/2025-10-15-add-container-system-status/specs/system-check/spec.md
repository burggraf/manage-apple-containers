## ADDED Requirements

### Requirement: Container System Status Check

The system SHALL provide a mechanism to verify that the Apple Container system (apiserver) is running and operational.

#### Scenario: Container system is running

- **WHEN** the `check_container_system_status` command is invoked
- **AND** the `container system status` command succeeds
- **AND** the output contains version information
- **THEN** the command SHALL return success with the status output

#### Scenario: Container system is not running

- **WHEN** the `check_container_system_status` command is invoked
- **AND** the `container system status` command output indicates "apiserver is not running and not registered with launchd"
- **THEN** the command SHALL return an error indicating the system is not running

#### Scenario: Container system status check fails

- **WHEN** the `check_container_system_status` command is invoked
- **AND** the `container system status` command fails with an unexpected error
- **THEN** the command SHALL return an error with the failure details

### Requirement: Container System Startup

The system SHALL provide a mechanism to start the Apple Container system with user consent.

#### Scenario: Start system successfully

- **WHEN** the `start_container_system` command is invoked
- **THEN** the command SHALL execute `echo "Y" | container system start`
- **AND** SHALL return success if the command completes without error

#### Scenario: Start system fails

- **WHEN** the `start_container_system` command is invoked
- **AND** the `container system start` command fails
- **THEN** the command SHALL return an error with the failure details

### Requirement: Automatic System Status Check on Startup

The application SHALL automatically verify the container system is running after verifying CLI installation.

#### Scenario: Application starts with system running

- **WHEN** the application launches
- **AND** the container CLI check succeeds
- **AND** the `check_container_system_status` command succeeds
- **THEN** the application SHALL proceed to normal operation without showing any system startup prompts

#### Scenario: Application starts with system not running

- **WHEN** the application launches
- **AND** the container CLI check succeeds
- **AND** the `check_container_system_status` command indicates the system is not running
- **THEN** the application SHALL display a system startup modal dialog
- **AND** the modal SHALL explain that the container system needs to be started
- **AND** the modal SHALL provide a "Start System" button and a "Cancel" button

#### Scenario: User chooses to start system

- **WHEN** the system startup modal is displayed
- **AND** the user clicks the "Start System" button
- **THEN** the application SHALL invoke the `start_container_system` command
- **AND** SHALL show a loading state during the operation
- **AND** upon success SHALL re-check the system status
- **AND** SHALL dismiss the modal if system is now running
- **AND** SHALL display an error message in the modal if startup fails

#### Scenario: User cancels system startup

- **WHEN** the system startup modal is displayed
- **AND** the user clicks the "Cancel" button
- **THEN** the application SHALL exit immediately and cleanly
- **AND** SHALL not leave any background processes running

### Requirement: System Startup UI Components

The application SHALL provide a modal dialog component for prompting users to start the container system.

#### Scenario: Modal displays system startup prompt

- **WHEN** the system startup modal is shown
- **THEN** the modal SHALL display a clear title (e.g., "Container System Not Running")
- **AND** SHALL include descriptive text explaining that the container system needs to be started for the application to function
- **AND** SHALL display a "Start System" action button
- **AND** SHALL display a "Cancel" button
- **AND** SHALL use appropriate Shadcn UI Dialog components for consistent styling
- **AND** SHALL not be dismissible via overlay click or escape key

#### Scenario: Modal shows loading state during startup

- **WHEN** the user clicks "Start System"
- **AND** the system startup is in progress
- **THEN** the modal SHALL display a loading indicator
- **AND** SHALL disable the "Start System" button
- **AND** SHALL keep the "Cancel" button enabled

#### Scenario: Modal displays startup error

- **WHEN** the system startup fails
- **THEN** the modal SHALL display the error message
- **AND** SHALL keep the "Start System" button enabled to allow retry
- **AND** SHALL keep the "Cancel" button enabled
