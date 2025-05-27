import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="fixed inset-0 -z-50 bg-[url('/images/3d-technology.jpg')] bg-cover bg-center bg-no-repeat brightness-[0.8]">
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content Overlay */}
            <div className="relative z-10">
                <div className="bg-backdrop-blur bg-black/10 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                    <div className="w-full max-w-sm">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col items-center gap-4">
                                {/* Logo */}
                                <Link  href="/" className="flex items-center space-x-2">
                                    <img src="/flogo.svg" alt="SKYPORT CARGO" className="h-20"/>
                                </Link>

                                <div className="space-y-2 mt-3 text-center">
                                    <h1 className="text-xl font-medium">{title}</h1>
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
