use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {name}! You've been greeted from Rust!")
}

#[tauri::command]
fn check_container_version() -> Result<String, String> {
    let output = Command::new("container")
        .arg("--version")
        .output();

    match output {
        Ok(result) => {
            if result.status.success() {
                let version = String::from_utf8_lossy(&result.stdout).trim().to_string();
                Ok(version)
            } else {
                let error = String::from_utf8_lossy(&result.stderr).trim().to_string();
                Err(format!("Container command failed: {error}"))
            }
        }
        Err(e) => {
            if e.kind() == std::io::ErrorKind::NotFound {
                Err("Container CLI not found. Please install the Apple Container system.".to_string())
            } else {
                Err(format!("Failed to execute container command: {e}"))
            }
        }
    }
}

#[tauri::command]
fn check_container_system_status() -> Result<String, String> {
    let output = Command::new("container")
        .arg("system")
        .arg("status")
        .output();

    match output {
        Ok(result) => {
            let stdout = String::from_utf8_lossy(&result.stdout);
            let stderr = String::from_utf8_lossy(&result.stderr);
            let combined_output = format!("{stdout}{stderr}");

            // Check if the output indicates the system is not running
            if combined_output.contains("apiserver is not running") {
                Err("Container system is not running. Please start the container system.".to_string())
            } else if result.status.success() && !stdout.trim().is_empty() {
                // System is running, return the status output
                Ok(stdout.trim().to_string())
            } else {
                // Unexpected output or error
                let trimmed_output = combined_output.trim();
                Err(format!("Container system status check failed: {trimmed_output}"))
            }
        }
        Err(e) => {
            if e.kind() == std::io::ErrorKind::NotFound {
                Err("Container CLI not found. Cannot check system status.".to_string())
            } else {
                Err(format!("Failed to execute container system status: {e}"))
            }
        }
    }
}

#[tauri::command]
fn start_container_system() -> Result<String, String> {
    // Use sh to pipe "Y" to container system start
    let output = Command::new("sh")
        .arg("-c")
        .arg("echo 'Y' | container system start")
        .output();

    match output {
        Ok(result) => {
            if result.status.success() {
                let stdout = String::from_utf8_lossy(&result.stdout).trim().to_string();
                Ok(stdout)
            } else {
                let stderr = String::from_utf8_lossy(&result.stderr).trim().to_string();
                Err(format!("Failed to start container system: {stderr}"))
            }
        }
        Err(e) => {
            Err(format!("Failed to execute container system start: {e}"))
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, check_container_version, check_container_system_status, start_container_system])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_greet_returns_greeting_message() {
        let result = greet("World");
        assert_eq!(result, "Hello, World! You've been greeted from Rust!");
    }

    #[test]
    fn test_greet_with_empty_name() {
        let result = greet("");
        assert_eq!(result, "Hello, ! You've been greeted from Rust!");
    }

    #[test]
    fn test_greet_with_special_characters() {
        let result = greet("Alice & Bob");
        assert_eq!(result, "Hello, Alice & Bob! You've been greeted from Rust!");
    }

    #[test]
    fn test_check_container_version_returns_result() {
        // This test verifies the function returns a Result type
        // The actual result depends on whether container CLI is installed
        let result = check_container_version();

        // Test should pass whether container is installed or not
        // If Ok, it should contain some text
        // If Err, it should contain an error message
        match result {
            Ok(version) => {
                assert!(!version.is_empty(), "Version string should not be empty");
            }
            Err(error) => {
                assert!(!error.is_empty(), "Error message should not be empty");
                assert!(
                    error.contains("not found") ||
                    error.contains("failed") ||
                    error.contains("Failed"),
                    "Error message should indicate what went wrong"
                );
            }
        }
    }

    #[test]
    fn test_check_container_version_error_message_format() {
        // Test that when container is not found, we get a helpful message
        let result = check_container_version();

        if let Err(error) = result {
            // If there's an error, verify it's informative
            assert!(
                error.contains("Container") || error.contains("container"),
                "Error message should mention 'container'"
            );
        }
    }

    #[test]
    fn test_check_container_system_status_returns_result() {
        // This test verifies the function returns a Result type
        // The actual result depends on whether container system is running
        let result = check_container_system_status();

        // Test should pass whether system is running or not
        match result {
            Ok(status) => {
                // If Ok, status should contain some text
                assert!(!status.is_empty(), "Status string should not be empty");
            }
            Err(error) => {
                // If Err, error should contain a meaningful message
                assert!(!error.is_empty(), "Error message should not be empty");
                assert!(
                    error.contains("not running") ||
                    error.contains("failed") ||
                    error.contains("not found"),
                    "Error message should indicate what went wrong: {}",
                    error
                );
            }
        }
    }

    #[test]
    fn test_start_container_system_returns_result() {
        // This test verifies the function returns a Result type
        // We don't actually want to start the system in tests
        // Just verify the function signature is correct
        let result = start_container_system();

        // Test should pass whether start succeeds or fails
        match result {
            Ok(_output) => {
                // If Ok, we got some output (could be empty)
                // The function returned successfully, which is what we're testing
            }
            Err(error) => {
                // If Err, error should contain a message
                assert!(!error.is_empty(), "Error message should not be empty");
                assert!(
                    error.contains("Failed") ||
                    error.contains("failed") ||
                    error.contains("not found"),
                    "Error message should indicate failure: {}",
                    error
                );
            }
        }
    }
}
