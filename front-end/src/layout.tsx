import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Outlet } from 'react-router-dom';
import React from 'react';

export default function Layout() {
	const [open, setOpen] = React.useState(false);

	return (
		<SidebarProvider open={open} onOpenChange={setOpen}>
			<AppSidebar collapsible="icon" />
			<main className="w-full px-5">
				<SidebarTrigger />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
