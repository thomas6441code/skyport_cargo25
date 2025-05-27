// resources/js/Pages/Home.tsx
import { FC } from 'react';
import { Globe, Shield, Plane, Ship, Warehouse, Check, ArrowRight, Users, Clock, MapPin } from 'lucide-react';
import MainLayout from "@/layouts/MainLayout";

const Home: FC = () => {
    const services = [
        {
            icon: <Plane size={24} />,
            title: "Air Freight",
            description: "Express air cargo solutions worldwide",
            features: ["24-48hr transit", "Customs clearance", "Real-time tracking"],
            link: "/services/air-freight"
        },
        {
            icon: <Ship size={24} />,
            title: "Ocean Freight",
            description: "Cost-effective sea shipping solutions",
            features: ["FCL/LCL options", "Port-to-port", "Cargo insurance"],
            link: "/services/ocean-freight"
        },
        {
            icon: <Warehouse size={24} />,
            title: "Warehousing",
            description: "Secure storage and distribution",
            features: ["Bonded warehouses", "Inventory management", "Pick & pack"],
            link: "/services/warehousing"
        }
    ];

    const stats = [
        { value: "15+", label: "Years Experience", icon: <Clock size={20} /> },
        { value: "500+", label: "Clients Worldwide", icon: <Users size={20} /> },
        { value: "50+", label: "Global Locations", icon: <MapPin size={20} /> }
    ];

    return (
        <MainLayout>

        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-sky-900 to-sky-700 text-white py-20">
                <div className="container mx-auto px-4 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Global Logistics Solutions</h1>
                    <p className="text-xl max-w-2xl mb-8 opacity-90">
                        Connecting your business to the world with reliable, efficient transportation
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="/quote"
                            className="px-6 py-3 bg-white text-sky-700 rounded-lg font-medium hover:bg-gray-100 transition"
                        >
                            Get a Quote
                        </a>
                        <a
                            href="/services"
                            className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white/10 transition"
                        >
                            Our Services
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="container mx-auto px-4 -mt-10 z-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md flex items-center">
                            <div className="bg-sky-100 p-3 rounded-lg mr-4 text-sky-600">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Core Services</h2>
                        <div className="w-16 h-1 bg-sky-500 mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive logistics solutions tailored to your business needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="bg-sky-500/10 p-3 rounded-lg text-sky-600">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-center text-sm mb-4">{service.description}</p>
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
                                    className="flex items-center justify-center text-sm font-medium text-sky-600 hover:text-sky-700"
                                >
                                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-medium uppercase tracking-wider mb-3">
              Our Philosophy
            </span>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Driving Logistics Forward</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            To revolutionize global logistics through innovative technology and sustainable practices
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="bg-sky-100 p-2 rounded-lg mr-3">
                                    <Globe className="w-6 h-6 text-sky-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                To be the most trusted logistics partner by redefining speed, reliability, and transparency
                                in global supply chains through cutting-edge technology.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="bg-sky-100 p-2 rounded-lg mr-3">
                                    <Shield className="w-6 h-6 text-sky-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Customer-first approach",
                                    "Operational excellence",
                                    "Sustainable practices",
                                    "Innovative solutions",
                                    "Business integrity"
                                ].map((value, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-4 w-4 text-sky-500 mt-0.5 mr-2 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-sky-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Ship With Us?</h2>
                    <p className="text-sky-100 max-w-2xl mx-auto mb-8">
                        Get started with our logistics solutions today and experience seamless global shipping
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-sky-700 rounded-lg font-medium hover:bg-gray-100 transition shadow-md"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>

        </MainLayout>

    );
};

export default Home;
