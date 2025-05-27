import {Link} from "@inertiajs/react";

export default function AppLogoIcon() {
    return (
        <>
            {/* Logo */}
            <Link  href="/" className="flex items-center space-x-2">
                <img src="/flogo.svg" alt="SKYPORT CARGO" className="h-12"/>
            </Link>
        </>
    );
}
