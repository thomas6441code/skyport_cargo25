import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { PageProps as InertiaPageProps } from '@inertiajs/inertia';

declare global {
    namespace React {
        interface Attributes {
            inertiatitle?: string;
        }
    }
}

declare module '@inertiajs/inertia' {
    interface PageProps extends InertiaPageProps {
        flash: {
            success?: string;
            error?: string;
            warning?: string;
            info?: string;
        };
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
            };
        };
    }
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface testimonials {
    quote: string;
    author: string;
    role: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

// types/company-values.d.ts
export interface CompanyValue {
    id?: number;
    type: 'mission' | 'vision' | 'value';
    title?: string;
    content: string;
    icon?: string;
    sort_order?: number;
}

export interface RouteStop {
  id?: number;
  location: string;
  code: string;
  order?: number;
}

export interface FlightRoute {
  id?: number;
  origin_city: string;
  origin_code: string;
  destination_city: string;
  destination_code: string;
  duration: string;
  active: boolean;
  departure_time: string;
  arrival_time: string;
  stops: RouteStop[];
  created_at?: string;
  updated_at?: string;
}

export interface CompanyValuesPageProps {
    mission?: CompanyValue;
    vision?: CompanyValue;
    values: CompanyValue[];
}

declare module 'lucide-react' {
    export const icons: Record<string, React.ComponentType<LucideProps>>;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Offices {
    id: number;
    country: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    coordinates: number[];
}

