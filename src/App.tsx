import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { exit } from "@tauri-apps/plugin-process";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { InstallationRequiredModal } from "@/components/system/InstallationRequiredModal";

function App() {
	const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

	// Startup check for container CLI
	useEffect(() => {
		const checkContainerInstallation = async () => {
			try {
				await invoke<string>("check_container_version");
				// CLI is installed, proceed normally
			} catch (error) {
				const errorMessage = String(error);
				// Only show modal if CLI is not found (not for other errors)
				if (errorMessage.includes("not found")) {
					setShowInstallModal(true);
				} else {
					// Log other errors but don't block the app
					// eslint-disable-next-line no-undef
					console.error("Container version check failed:", errorMessage);
				}
			}
		};

		checkContainerInstallation();
	}, []);

	const handleCloseInstallModal = async () => {
		// Exit the application when user closes the modal
		await exit(0);
	};

	return (
		<>
			<InstallationRequiredModal
				isOpen={showInstallModal}
				onClose={handleCloseInstallModal}
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
							<CardDescription>
								Manage your Apple containers
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button>View Containers</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Images</CardTitle>
							<CardDescription>
								Browse available container images
							</CardDescription>
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
