import { Truck, Clock, CheckCircle, Headset } from 'lucide-react';
interface StatItem {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface StatsBannerProps {
    stats: StatItem[];
}

export const StatsBanner = ({ stats }: StatsBannerProps) => {
    // Default stats if none provided
    const defaultStats = [
        { value: '48h', label: 'Average Transit Time', icon: <Clock className="h-8 w-8" /> },
        { value: '99.7%', label: 'On-Time Delivery', icon: <CheckCircle className="h-8 w-8" /> },
        { value: '15+', label: 'Years Experience', icon: <Truck className="h-8 w-8" /> },
        { value: '24/7', label: 'Customer Support', icon: <Headset className="h-8 w-8" /> }
    ];

    const displayStats = stats.length > 0 ? stats : defaultStats;

    return (
        <div className="bg-black/10 backdrop-blur-xs text-white py-24 z-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {displayStats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white/20 p-4 rounded-full">
                                    {stat.icon || <Truck className="h-8 w-8" />}
                                </div>
                            </div>
                            <div className="text-2xl  font-bold mb-2">{stat.value}</div>
                            <div className="text-sm uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
