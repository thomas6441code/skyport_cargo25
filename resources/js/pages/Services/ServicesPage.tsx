import { Globe, Shield, Plane, Ship, Warehouse, Check, ArrowRight, Users, Clock, MapPin } from 'lucide-react';
import MainLayout from "@/layouts/MainLayout";
import ServicesCard from '@/components/common/ServicesCard';

interface Service {
    slug: string;
    image: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    link: string;
    long_Description?: string;
    benefits?: string[];
    process_Steps?: string[];
}

const ServicesIndex = ({ services }: { services: Service[] }) => {


    const stats = [
        { value: "15+", label: "Years Experience", icon: <Clock size={20} /> },
        { value: "500+", label: "Clients Worldwide", icon: <Users size={20} /> },
        { value: "50+", label: "Global Locations", icon: <MapPin size={20} /> }
    ];

    return (
        <MainLayout>

            <div className="min-h-screen pt-10 bg-white">
                {/* Top Section */}
                <div className="relative h-[90vh] min-h-[200px] max-h-[530px] rounded-b-[5rem] pt-24 py-3">
                    {/* 3D World Animation Container */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[5rem] flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <div
                                className={`w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-transform duration-1000`}
                                style={{
                                    backgroundImage: `url('/images/transport.jpg')`,
                                    filter: 'brightness(0.8)'
                                }}
                            />
                            <div className="absolute inset-0">
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/95 rounded-b-[5rem] flex items-center">
                        <div className="container mx-auto px-4 flex flex-col items-center text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">China-Tanzania Logistics Solutions</h1>
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="container mx-auto px-4 -mt-10 z-10 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-xs hover:bg-white/10 p-6 rounded-xl shadow-xl flex items-center">
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
                <section className="relative py-10 overflow-hidden bg-white">
                    {/* Diagonal background */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-100 to-blue-50 transform -skew-y-6 origin-top-left"></div>
                    </div>
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Core Services</h2>
                            <div className="w-16 h-1 bg-sky-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Comprehensive logistics solutions tailored to your business needs
                            </p>
                        </div>

                        <ServicesCard services={services} />
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
                                <div className="p-3">
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
                                <div className="p-3">
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

export default ServicesIndex;
