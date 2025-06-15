import { CheckCircle2 } from 'lucide-react';
import IconComponent from './IconComponent';

interface Service {
    slug: string;
    image: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    link: string;
    long_Description?: string;
    benefits?: string[];
    process_Steps?: string[];
}

const ServicesCards = ({ services }: { services: Service[] }) => {
    return (
        <section className="relative py-10 overflow-hidden bg-white">
            {/* Diagonal background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-100 to-blue-50 transform -skew-y-6 origin-top-left"></div>
            </div>

            <div className="container mx-auto px-4 text-white max-w-7xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {services?.map((service, index) => (
                            <div key={service.slug} className="relative h-full"> {/* Added h-full here */}
                                <ServiceCard service={service} index={index} />

                                {/* Decorative elements */}
                                {index % 2 === 0 ? (
                                    <div className="absolute left-12 top-12 w-24 h-24 rounded-full bg-sky-400/10 blur-xl"></div>
                                ) : (
                                    <div className="absolute right-12 top-44 w-44 h-44 rounded-full bg-blue-400/20 blur-xl"></div>
                                )}

                                {index + 2 === 2 ? (
                                    <div className="absolute left-12 -top-12 w-24 h-32 rounded-full bg-sky-400/10 blur-xl"></div>
                                ) : (
                                    <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-blue-400/20 blur-xl"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const colors = [
        'bg-blue-50 text-blue-600',
        'bg-green-50 text-green-600',
        'bg-purple-50 text-purple-600',
        'bg-amber-50 text-amber-600',
    ];

    const hoverColors = [
        'hover:bg-blue-100',
        'hover:bg-green-100',
        'hover:bg-purple-100',
        'hover:bg-amber-100',
    ];

    // Safely get color classes
    const colorClass = colors[index % colors.length] || colors[0];
    const hoverColor = hoverColors[index % hoverColors.length] || hoverColors[0];
    const [bgColor, textColor] = colorClass.split(' ');

    // Get only the first 5 features
    const displayedFeatures = service.features.slice(0, 5);

    return (
        <div className={`h-full rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 ${hoverColor} border border-gray-100 shadow-sm flex flex-col`}>
            <div className={`flex items-center justify-center mb-4`}>
                <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center mb-4`}>
                    <IconComponent icon={service.icon} />
                </div>
                <h3 className="text-xl ml-2 font-semibold text-gray-900 mb-2">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>

            <a
                href={`/services/${service.slug}`}
                className={`inline-flex items-center font-medium ${textColor} hover:underline mt-auto`}
            >
                View more
                <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </a>
        </div>
    );
};

export default ServicesCards;