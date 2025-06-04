import { PageProps as InertiaPageProps } from '@inertiajs/inertia';

declare module '@inertiajs/inertia' {
    interface PageProps extends InertiaPageProps {
        flash: {
            success?: string;
            error?: string;
            warning?: string;
            info?: string;
        };
    }
}