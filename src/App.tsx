import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function App() {
	return (
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
	);
}

export default App;
