import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function App() {
	const [versionResult, setVersionResult] = useState<string>("");
	const [isChecking, setIsChecking] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const handleCheckContainerVersion = async () => {
		setIsChecking(true);
		setVersionResult("");
		setIsError(false);

		try {
			const version = await invoke<string>("check_container_version");
			setVersionResult(`Container CLI installed: ${version}`);
			setIsError(false);
		} catch (error) {
			setVersionResult(String(error));
			setIsError(true);
		} finally {
			setIsChecking(false);
		}
	};

	return (
		<Layout>
			<div className="space-y-6">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<p className="text-muted-foreground">
						Welcome to MAC - Manage Apple Containers
					</p>
				</div>

				{/* Temporary System Check Card */}
				<Card className="border-dashed">
					<CardHeader>
						<CardTitle>System Check (Temporary)</CardTitle>
						<CardDescription>
							Verify that the Apple Container CLI is installed
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button
							onClick={handleCheckContainerVersion}
							disabled={isChecking}
							variant="default"
						>
							{isChecking ? "Checking..." : "Is container installed?"}
						</Button>
						{versionResult && (
							<div
								className={`p-4 rounded-md text-sm ${
									isError
										? "bg-destructive/10 text-destructive border border-destructive/20"
										: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
								}`}
							>
								{versionResult}
							</div>
						)}
					</CardContent>
				</Card>

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
	);
}

export default App;
