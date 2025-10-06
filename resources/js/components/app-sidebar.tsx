import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Atom, ChartBarDecreasingIcon, PlaneTakeoff,
    Folder, GalleryThumbnails, LayoutGrid, LocateFixed,
    LucideGitPullRequestDraft, MessageCircleIcon, PackageOpen, SettingsIcon,
    ShieldQuestion, FileText, StarIcon, Users2Icon, WorkflowIcon
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: WorkflowIcon,
    },
    {
        title: 'Quotes',
        href: '/admin/quotes',
        icon: LucideGitPullRequestDraft,
    },
    {
        title: 'Messages',
        href: '/admin/messages',
        icon: MessageCircleIcon,
    },
    {
        title: 'Faqs',
        href: '/admin/faqs',
        icon: ShieldQuestion,
    },
    {
        title: 'Stats',
        href: '/admin/stats',
        icon: Atom,
    },
    {
        title: 'Team-Members',
        href: '/admin/teams',
        icon: Users2Icon,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: StarIcon,
    },
    {
        title: 'Slides',
        href: '/admin/slides',
        icon: GalleryThumbnails,
    },
    {
        title: 'Departments',
        href: '/admin/departments',
        icon: ChartBarDecreasingIcon,
    },
    {
        title: 'Air Routes',
        href: '/admin/flight-routes',
        icon: PlaneTakeoff,
    },
    {
        title: 'Philosophy',
        href: '/admin/company/mission-vision',
        icon: FileText,
    },
    {
        title: 'Offices',
        href: '/admin/offices',
        icon: LocateFixed,
    },
    {
        title: 'CargoTypes',
        href: '/admin/cargotypes',
        icon: PackageOpen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
    },
    {
        title: 'Repository',
        href: 'https://github.com/thomas6441code/skyport_cargo25',
        icon: Folder,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className='rounded-lg shadow-2xl hide-scrollbar' variant="sidebar" >
            <SidebarHeader className='backdrop-blur-xs' >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="xl" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className='backdrop-blur-sm'>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className='text-black'>
                <NavFooter items={footerNavItems} className="mt-auto text-black bg-green" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
