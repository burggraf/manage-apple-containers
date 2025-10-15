use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
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
                Err(format!("Container command failed: {}", error))
            }
        }
        Err(e) => {
            if e.kind() == std::io::ErrorKind::NotFound {
                Err("Container CLI not found. Please install the Apple Container system.".to_string())
            } else {
                Err(format!("Failed to execute container command: {}", e))
            }
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, check_container_version])
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
}
