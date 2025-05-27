import {
    Plane,
    Warehouse,
    Check,
    BookmarkCheckIcon,
    LucideCircleArrowOutDownRight
} from 'lucide-react';

const services = [
    {
        icon: <Plane size={24} />,
        title: "Air Freight",
        description: "Express air cargo solutions between China and Tanzania",
        features: ["24-48hr transit", "Customs clearance", "Real-time tracking"],
        link: "/services/air-freight"
    },
    {
        icon: <Warehouse size={24} />,
        title: "Export",
        description: "Secure storage and distribution solutions",
        features: ["Bonded warehouses", "Inventory management", "Pick & pack"],
        link: "/services/warehousing"
    },  {
        icon: <BookmarkCheckIcon size={24} />,
        title: "Customer Clearance",
        description: "Cost-effective sea shipping for large shipments",
        features: ["FCL/LCL options", "Port-to-port", "Cargo insurance"],
        link: "/services/ocean-freight"
    },
    {
        icon: <LucideCircleArrowOutDownRight size={24} />,
        title: "Out Sourcing",
        description: "Cost-effective sea shipping for large shipments",
        features: ["FCL/LCL options", "Port-to-port", "Cargo insurance"],
        link: "/services/ocean-freight"
    },
];

export default function ServiceCards() {
    return (
        <section className="py-12 bg-gradient-to-b from-sky-50 to-white">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Core Services</h2>
                    <div className="w-20 h-1 bg-sky-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                        Comprehensive logistics solutions tailored for the China-Tanzania trade corridor
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 md:px-0">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-sky-100"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="bg-sky-500/10 p-3 rounded-lg text-sky-600 group-hover:bg-sky-500/20 transition-colors">
                                    {service.icon}
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{service.title}</h3>
                            <p className="text-gray-500 text-center text-sm mb-5">{service.description}</p>

                            <ul className="space-y-2 mb-6">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="h-4 w-4 text-sky-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={service.link}
                                className="block text-center text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
                            >
                                Learn more →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
