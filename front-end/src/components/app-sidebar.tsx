import { BriefcaseBusiness, Package, Wallet, CircleDollarSign, ChartColumnBig, Home, Users } from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items.
const items = [
	{
		title: 'Home',
		url: '#',
		icon: Home,
	},
	{
		title: 'Alunos',
		url: '/alunos',
		icon: Users,
	},
	{
		title: 'Funcionarios',
		url: '/professores',
		icon: BriefcaseBusiness,
	},
	{
		title: 'Equipamentos',
		url: '#',
		icon: Package,
	},
	{
		title: 'Relatorio',
		url: '/professores',
		icon: ChartColumnBig,
	},
	{
		title: 'Financeiro',
		url: '/professores',
		icon: Wallet,
	},
	{
		title: 'Mensalidade',
		url: '/professores',
		icon: CircleDollarSign,
	},
];

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="sidebar" color="dark">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
