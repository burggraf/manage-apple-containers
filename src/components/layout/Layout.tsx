import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<div className="flex h-screen flex-col">
			<Header />
			<div className="flex flex-1 overflow-hidden">
				<Sidebar />
				<MainContent>{children}</MainContent>
			</div>
		</div>
	);
}
