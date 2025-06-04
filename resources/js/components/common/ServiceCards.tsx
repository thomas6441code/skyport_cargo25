import { Plane, Warehouse, BookmarkCheck as BookmarkCheckIcon, CircleArrowOutDownRight as LucideCircleArrowOutDownRight, CheckCircle2 } from 'lucide-react';

interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    link: string;
}

const services: Service[] = [
    {
        icon: <Plane size={24} />,
        title: "Air  Freight",
        description: "Express air cargo solutions between China and Tanzania",
        features: ["24-48hr transit", "Customs clearance", "Real-time tracking"],
        link: "/services/air-freight"
    },
    {
        icon: <Warehouse size={24} />,
        title: "Export Services",
        description: "Secure storage and distribution solutions",
        features: ["Bonded warehouses", "Inventory management", "Pick & pack"],
        link: "/services/export-services"
    }, {
        icon: <BookmarkCheckIcon size={24} />,
        title: "Customer Clearance",
        description: "Cost-effective sea shipping for large shipments",
        features: ["FCL/LCL options", "Port-to-port", "Cargo insurance"],
        link: "/services/customs-clearance"
    },
    {
        icon: <LucideCircleArrowOutDownRight size={24} />,
        title: "Out  Sourcing",
        description: "Cost-effective sea shipping for large shipments",
        features: ["FCL/LCL options", "Port-to-port", "Cargo insurance"],
        link: "/services/outsourcing"
    },
];

const ServicesCards = () => {
    return (
        <section className="relative py-10 overflow-hidden bg-white">
            {/* Diagonal background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-100 to-blue-50 transform -skew-y-6 origin-top-left"></div>
            </div>

            <div className="container mx-auto px-4 text-white max-w-7xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-bold text-black mb-4">OUR SERVICES</h2>
                        <div className="w-32 h-1.5 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                            Accelerating trade between China and Tanzania with innovative supply chain management
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {services.map((service, index) => (
                            <div className='relative'>
                                <ServiceCard key={index} service={service} index={index} />
                                {/* Decorative elements */}
                                {index % 2 === 0 ? (
                                    <div className="absolute left-12 -top-12 w-24 h-24 rounded-full bg-sky-400/20 blur-xl"></div>
                                ) : (
                                    <div className="absolute -right-12 top-44 w-44 h-44 rounded-full bg-blue-400/20 blur-xl"></div>
                                )}

                                {index + 2 === 2 ? (
                                    <>
                                        <div className="absolute -left-12 top-12 w-24 h-24 rounded-full bg-sky-400/20 blur-xl"></div>
                                        <div className="absolute left-12 -top-12 w-24 h-32 rounded-full bg-sky-400/20 blur-xl"></div>
                                    </>
                                ) : (
                                    <div className="absolute right-12 -top-12 w-24 h-24 rounded-full bg-blue-400/20 blur-xl"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
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

    return (
        <div
            className={`rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 ${hoverColors[index % hoverColors.length]} border border-gray-100 shadow-sm`}
        >
            <div className={`flex items-center justify-center mb-4`}>
                <div className={`w-12 h-12 rounded-lg ${colors[index % colors.length]} flex items-center justify-center mb-4`}>
                    {service.icon}
                </div>
                <h3 className="text-xl ml-2 font-semibold text-gray-900 mb-2">{service.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>

            <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <CheckCircle2 className={`flex-shrink-0 w-5 h-5 ${colors[index % colors.length].split(' ')[1]} mr-2 mt-0.5`} />
                        <span className="text-gray-700">{feature}</span>
                    </li>
                ))}
            </ul>

            <a
                href={service.link}
                className={`inline-flex items-center font-medium ${colors[index % colors.length].split(' ')[1]} hover:underline`}
            >
                Learn more
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