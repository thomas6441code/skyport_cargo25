import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal my-2 hover:bg-sky-200 rounded-lg">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuItem variant='default' className='hover:bg-sky-200 rounded-lg py-3' asChild>
                <Link className="block w-full hover:bg-sky-200" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2 text-gray-700" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
