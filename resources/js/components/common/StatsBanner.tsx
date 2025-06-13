import IconComponent from '@/components/common/IconComponent';

interface Stat {
    value: string;
    label: string;
    icon: string;
}

interface Props {
    stats: Stat[];
}


export const StatsBanner = ({ stats }: Props) => {

    return (
        <div className="relative py-24 z-0 overflow-hidden bg-black">
            {/* Abstract logistics shapes in blurred background */}
            <div className="absolute inset-0 z-[-1] overflow-hidden">
                {/* Container shapes */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-lg border-2 border-white/10 rotate-12 backdrop-blur-xs"></div>
                <div className="absolute top-1/3 right-1/4 w-40 h-24 rounded-lg border-2 border-white/10 rotate-[-8deg] backdrop-blur-xs"></div>

                {/* Shipping arrows */}
                <div className="absolute top-1/2 left-1/3 w-16 h-16">
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[8px] border-l-transparent border-b-[16px] border-b-white/10 border-r-[8px] border-r-transparent"></div>
                    <div className="absolute top-4 left-2 w-12 h-[2px] bg-white/10"></div>
                </div>

                {/* Warehouse rack shapes */}
                <div className="absolute bottom-1/4 right-1/3 w-48 h-24">
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10"></div>
                    <div className="absolute bottom-0 left-0 w-[2px] h-full bg-white/10"></div>
                    <div className="absolute bottom-0 right-0 w-[2px] h-full bg-white/10"></div>
                    <div className="absolute bottom-8 left-0 w-full h-[2px] bg-white/10"></div>
                </div>

                {/* Cargo ship hull shape */}
                <div className="absolute bottom-1/3 left-1/5 w-56 h-12 rounded-t-full border-t-2 border-white/50"></div>

                {/* Airplane wing shape */}
                <div className="absolute top-1/5 right-1/5 w-40 h-4 bg-white/30 rounded-full"></div>
                <div className="absolute top-[22%] right-[18%] w-16 h-4 bg-white/10 rotate-45 rounded-full"></div>

                {/* Blur overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white/20 p-4 text-white rounded-full backdrop-blur-md">
                                    <IconComponent icon={stat.icon} />
                                </div>
                            </div>
                            <div className="text-2xl font-bold mb-2 text-white">{stat.value}</div>
                            <div className="text-sm uppercase tracking-wider text-white/80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

