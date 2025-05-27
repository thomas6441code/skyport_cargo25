import Footer from '@/components/common/Footer';
import Header from "@/components/common/Header";
import { type ReactNode} from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="min-h-screen flex flex-col">
                {children}
            </div>
            <Footer />
        </div>
    );
}
