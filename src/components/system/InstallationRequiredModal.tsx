import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink } from "lucide-react";
import { open } from "@tauri-apps/plugin-shell";

interface InstallationRequiredModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function InstallationRequiredModal({ isOpen, onClose }: InstallationRequiredModalProps) {
	const handleOpenGitHub = async () => {
		try {
			await open("https://github.com/apple/container/releases/latest");
		} catch (error) {
			// eslint-disable-next-line no-undef
			console.error("Failed to open GitHub releases page:", error);
		}
	};

	return (
		<Dialog open={isOpen} modal>
			<DialogContent
				className="max-w-[550px] rounded-lg border-4 border-gray-800 shadow-2xl [&>button]:hidden"
				onPointerDownOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<div className="flex items-center gap-2">
						<AlertCircle className="h-5 w-5 text-destructive" />
						<DialogTitle>Apple Container CLI Required</DialogTitle>
					</div>
					<DialogDescription className="pt-4">
						The Apple Container CLI is required for this application to function. MAC
						(Manage Apple Containers) is a graphical interface for the container system
						and cannot operate without it.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Please install the Apple Container CLI from the official GitHub releases
						page and restart the application.
					</p>

					<Button
						variant="outline"
						className="w-full justify-between"
						onClick={handleOpenGitHub}
					>
						<span>Open GitHub Releases Page</span>
						<ExternalLink className="h-4 w-4" />
					</Button>
				</div>

				<DialogFooter className="flex-col gap-2 sm:flex-col">
					<p className="text-sm text-muted-foreground text-center">
						The application will exit when you close this dialog.
						<br />
						Please restart after installing the CLI.
					</p>
					<Button variant="default" onClick={onClose} className="w-full">
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
