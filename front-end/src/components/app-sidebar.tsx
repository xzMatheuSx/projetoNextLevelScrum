import * as React from 'react';
import { BookOpen, Bot, Settings2, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

const data = {
	user: {
		name: 'Emanoel Castanha',
		email: 'Emanoel@gmail.com',
		avatar: './images/userImage.png',
	},
	navMain: [
		{
			title: 'Vendas',
			url: '#',
			icon: Bot,
			items: [
				{
					title: 'Vendas',
					url: '#',
				},
			],
		},
		{
			title: 'Financeiro',
			url: '#',
			icon: Settings2,
			items: [
				{
					title: 'Mensalidade',
					url: '#',
				},
				{
					title: 'Financeiro',
					url: '#',
				},
			],
		},
		{
			title: 'Operações',
			url: '#',
			icon: BookOpen,
			items: [
				{
					title: 'Equipamentos',
					url: '#',
				},
			],
		},
		{
			title: 'Recursos Humanos',
			url: '#',
			icon: SquareTerminal,
			items: [
				{
					title: 'Alunos',
					url: '#',
				},
				{
					title: 'Funcionarios',
					url: '#',
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="sidebar" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<div>
										<img src="../images/favicon.ico" />
									</div>
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">Academia</span>
									<span className="truncate text-xs">Next Level</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
