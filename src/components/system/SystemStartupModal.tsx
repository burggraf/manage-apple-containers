import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

interface SystemStartupModalProps {
	isOpen: boolean;
	isLoading: boolean;
	error: string | null;
	onStartSystem: () => void;
	onCancel: () => void;
}

export function SystemStartupModal({
	isOpen,
	isLoading,
	error,
	onStartSystem,
	onCancel,
}: SystemStartupModalProps) {
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
						<DialogTitle>Container System Not Running</DialogTitle>
					</div>
					<DialogDescription className="pt-4">
						The Apple Container system (apiserver) is not currently running. This
						application requires the container system to be active to manage containers.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Would you like to start the container system now?
					</p>

					{error && (
						<div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
							<p className="font-medium">Failed to start system:</p>
							<p className="mt-1">{error}</p>
						</div>
					)}

					{isLoading && (
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Loader2 className="h-4 w-4 animate-spin" />
							<span>Starting container system...</span>
						</div>
					)}
				</div>

				<DialogFooter className="flex-col gap-2 sm:flex-col">
					<p className="text-sm text-muted-foreground text-center">
						The application will exit if you cancel.
					</p>
					<div className="flex gap-2 w-full">
						<Button
							variant="outline"
							onClick={onCancel}
							className="flex-1"
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button
							variant="default"
							onClick={onStartSystem}
							className="flex-1"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Starting...
								</>
							) : (
								"Start System"
							)}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
