import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="fixed inset-0 -z-50 bg-white">
            {/* Optional overlay */}
            <div className="absolute inset-0 bg-white/30"></div>

            {/* Content Overlay */}
            <div className="relative z-10 bg-backdrop-blur text-black">
                <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                    <div className="flex items-center justify-center w-full max-w-md shadow-xl p-6 rounded-lg">
                        <div className="flex flex-col justify-center gap-8 w-full mx-auto p-8">
                            <div className="flex items-center gap-4 mx-auto">
                                {/* Logo */}
                                <Link href="/" className="flex items-center space-x-2">
                                    <img src="/flogo.svg" alt="SKYPORT CARGO" className="h-20" />
                                </Link>

                            </div>
                            <div className="space-y-2 mt-10">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
