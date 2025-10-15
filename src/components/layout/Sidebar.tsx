export function Sidebar() {
	return (
		<aside className="w-56 flex-shrink-0 border-r bg-card">
			<nav className="p-4">
				<ul className="space-y-2">
					<li>
						<a
							href="#"
							className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
						>
							Containers
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
						>
							Images
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
						>
							Settings
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
