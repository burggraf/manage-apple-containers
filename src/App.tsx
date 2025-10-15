import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { exit } from "@tauri-apps/plugin-process";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InstallationRequiredModal } from "@/components/system/InstallationRequiredModal";
import { SystemStartupModal } from "@/components/system/SystemStartupModal";

function App() {
	const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
	const [showSystemStartupModal, setShowSystemStartupModal] = useState<boolean>(false);
	const [isStartingSystem, setIsStartingSystem] = useState<boolean>(false);
	const [startupError, setStartupError] = useState<string | null>(null);

	// Startup check for container CLI and system status
	useEffect(() => {
		const checkContainerSystem = async () => {
			// 1. Check CLI installation first
			try {
				await invoke<string>("check_container_version");
				// CLI is installed, proceed to system status check
			} catch (error) {
				const errorMessage = String(error);
				// Only show modal if CLI is not found (not for other errors)
				if (errorMessage.includes("not found")) {
					setShowInstallModal(true);
					return; // Don't proceed to system check
				} else {
					// Log other errors but don't block the app
					// eslint-disable-next-line no-undef
					console.error("Container version check failed:", errorMessage);
				}
			}

			// 2. Check if container system is running
			try {
				await invoke<string>("check_container_system_status");
				// System is running, proceed normally
			} catch (error) {
				const errorMessage = String(error);
				// Show modal if system is not running
				if (errorMessage.includes("not running")) {
					setShowSystemStartupModal(true);
				} else {
					// Log other errors but don't block the app
					// eslint-disable-next-line no-undef
					console.error("Container system status check failed:", errorMessage);
				}
			}
		};

		checkContainerSystem();
	}, []);

	const handleCloseInstallModal = async () => {
		// Exit the application when user closes the modal
		await exit(0);
	};

	const handleStartSystem = async () => {
		setIsStartingSystem(true);
		setStartupError(null);

		try {
			// Start the container system
			await invoke<string>("start_container_system");

			// Verify the system is now running
			await invoke<string>("check_container_system_status");

			// Success - dismiss the modal
			setShowSystemStartupModal(false);
		} catch (error) {
			const errorMessage = String(error);
			setStartupError(errorMessage);
		} finally {
			setIsStartingSystem(false);
		}
	};

	const handleCancelSystemStartup = async () => {
		// Exit the application when user cancels
		await exit(0);
	};

	return (
		<>
			<InstallationRequiredModal
				isOpen={showInstallModal}
				onClose={handleCloseInstallModal}
			/>
			<SystemStartupModal
				isOpen={showSystemStartupModal}
				isLoading={isStartingSystem}
				error={startupError}
				onStartSystem={handleStartSystem}
				onCancel={handleCancelSystemStartup}
			/>
			<Layout>
				<div className="space-y-6">
					<div>
						<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
						<p className="text-muted-foreground">
							Welcome to MAC - Manage Apple Containers
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Containers</CardTitle>
								<CardDescription>Manage your Apple containers</CardDescription>
							</CardHeader>
							<CardContent>
								<Button>View Containers</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Images</CardTitle>
								<CardDescription>Browse available container images</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="secondary">View Images</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Settings</CardTitle>
								<CardDescription>
									Configure container system settings
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button variant="outline">Open Settings</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default App;
