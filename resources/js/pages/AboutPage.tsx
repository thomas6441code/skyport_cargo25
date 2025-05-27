import {useState} from 'react';
import {Clock, Globe, Trophy, Shield, Truck, Plane, Ship, Warehouse, ArrowRight, Check} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import {Link} from "@inertiajs/react";

export default function AboutUs() {
    const [activeTimelineItem, setActiveTimelineItem] = useState(3);

    const teamMembers = [
        {
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            bio: 'With over 20 years in logistics, Sarah founded SkyPort to revolutionize cargo transportation.',
            image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            name: 'Michael Chen',
            role: 'Chief Operations Officer',
            bio: 'Operations expert specializing in global supply chain optimization and process improvement.',
            image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            name: 'David Wilson',
            role: 'Head of Technology',
            bio: 'Leads our digital transformation with cutting-edge tracking and logistics software solutions.',
            image: 'https://randomuser.me/api/portraits/men/75.jpg'
        },
        {
            name: 'Emma Rodriguez',
            role: 'Customer Experience Director',
            bio: 'Dedicated to ensuring seamless service and client satisfaction across all operations.',
            image: 'https://randomuser.me/api/portraits/women/63.jpg'
        }
    ];

    const milestones = [
        {
            year: '2010',
            title: 'Company Founded',
            description: 'Established with just 5 employees and 3 trucks serving local businesses.'
        },
        {
            year: '2013',
            title: 'First International Route',
            description: 'Expanded operations to cross-border shipping between US and Canada.'
        },
        {
            year: '2016',
            title: 'Warehouse Network',
            description: 'Built our first 100,000 sq ft distribution center in Chicago.'
        },
        {
            year: '2019',
            title: 'Technology Platform',
            description: 'Launched proprietary logistics management and tracking system.'
        },
        {
            year: '2022',
            title: 'Global Expansion',
            description: 'Opened offices in Europe and Asia, serving 25+ countries worldwide.'
        }
    ];

    const stats = [
        { value: '15M+', label: 'Packages Delivered', icon: <Truck className="w-8 h-8" /> },
        { value: '98.7%', label: 'On-Time Rate', icon: <Clock className="w-8 h-8" /> },
        { value: '45+', label: 'Countries Served', icon: <Globe className="w-8 h-8" /> },
        { value: '250+', label: 'Industry Awards', icon: <Trophy className="w-8 h-8" /> }
    ];

    const services = [
        { name: 'Air Freight', icon: <Plane className="w-6 h-6" /> },
        { name: 'Ocean Shipping', icon: <Ship className="w-6 h-6" /> },
        { name: 'Logistics', icon: <Warehouse className="w-6 h-6" /> },
        { name: 'Customs Brokerage', icon: <Shield className="w-6 h-6" /> }
    ];

    return (
        <MainLayout>
            {/*Background Image*/}
            <div className="fixed inset-0 bg-[url('/images/steve-unsplash.jpg')] bg-cover bg-center bg-no-repeat brightness-[0.5]"></div>

            {/* Content Overlay */}
            <div className="relative z-20">

                {/* Top Section */}
                <div className="relative h-[90vh] min-h-[200px] pt-24 py-3">
                    {/* 3D World Animation Container */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-sm flex items-center justify-center">
                        <div className="relative w-full h-full">
                            {/* Sample 3D World Animation - Replace with your actual 3D asset */}
                            <div
                                className={`w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-transform duration-1000`}
                                style={{
                                    backgroundImage: `url('/images/sebastian.jpg')`,
                                    filter: 'brightness(0.8)'
                                }}
                            />

                            {/* Animated route lines overlay */}
                            <div className="absolute inset-0">
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/95 rounded-b-sm flex items-center">
                                <div className="container mx-auto px-4 text-white">
                                    <div className="max-w-5xl pt-5 relative z-10">
                                        <h1 className="text-3xl md:mt-3 lg:text-6xl font-bold leading-tight">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                                                 About Us
                                            </span>
                                            <br />
                                            <span className="text-xl md:text-2xl lg:text-4xl" >
                                                Our Story as Specialists
                                            </span>
                                        </h1>

                                        <p className="text-lg md:text-xl max-w-xl leading-relaxed">
                                            From humble beginnings to global logistics leader - delivering excellence since 2010
                                            Join thousands of businesses who trust us with their supply chain needs
                                        </p>
                                        <div className="flex flex-col mt-5 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-[15rem]">
                                            <Link href='/#' className="bg-blue-600 hover:bg-blue-700 px-4 py-4 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                                                Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    <div className="absolute border-gradient-to-l from-bg-sky-300 to-bg-gray-800 border-2 bg-white rounded-4xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-3xl px-4 z-30">
                        <h1 className="text-2xl text-black md:text-4xl py-5 text-center w-full font-bold" >
                            Our Story as Specialists
                        </h1>
                    </div>
                </div>

                {/* Mission Section */}
                <section className="py-20 bg-gradient-to-br from-sky-50 to-white">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-14">
                                <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-medium uppercase tracking-wider mb-3">
                                    Our Philosophy
                                </span>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Driving Logistics Forward
                                </h2>
                                <div className="relative max-w-2xl mx-auto">
                                    <p className="text-gray-600 leading-relaxed">
                                        To revolutionize global logistics through innovative technology, unparalleled service,
                                        and sustainable practices that connect businesses and communities worldwide.
                                    </p>
                                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-sky-500"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Vision Card */}
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-sky-100 p-2 rounded-lg mr-3">
                                            <Globe className="w-6 h-6 text-sky-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        To be the most trusted logistics partner by redefining speed, reliability, and transparency
                                        in global supply chains through cutting-edge technology and customer-centric solutions.
                                    </p>
                                </div>

                                {/* Values Card */}
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-sky-100 p-2 rounded-lg mr-3">
                                            <Shield className="w-6 h-6 text-sky-600" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            "Customer-first approach that anticipates needs",
                                            "Operational excellence in every process",
                                            "Sustainable growth with eco-conscious practices",
                                            "Innovative solutions that disrupt the status quo",
                                            "Integrity in all business relationships"
                                        ].map((value, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="mt-1 mr-2 flex-shrink-0">
                                                    <Check className="w-4 h-4 text-sky-500" />
                                                </div>
                                                <span className="text-gray-600 text-sm">{value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Compact Timeline */}
                <section className="bg-black/75 backdrop-blur-xs">
                    <div className="py-16">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl font-bold text-gray-50">Our Growth Timeline</h2>
                                <p className="text-gray-50 mt-2">Branching milestones of our journey</p>
                            </div>

                            <div className="relative">
                                {/* Vertical tree trunk */}
                                <div className="absolute left-6 h-full w-1 bg-gray-300 md:left-1/2 md:-translate-x-1/2"></div>

                                <div className="space-y-8 pl-12 md:pl-0">
                                    {milestones.map((milestone, index) => (
                                        <div
                                            key={index}
                                            className="relative flex items-start"
                                            onMouseEnter={() => setActiveTimelineItem(index)}
                                        >
                                            {/* Tree branch connector */}
                                            <div className={`absolute top-5 -left-7 h-0.5 w-7 bg-gray-300 md:${index % 2 === 0 ? 'right-full mr-12' : 'left-full ml-12'}`}></div>

                                            {/* Tree node */}
                                            <div className={`w-3 h-3 rounded-full mt-1.5 absolute ${index % 2 === 0 ? '-left-9 md:left-1/2 md:-translate-x-[calc(50%+3.5rem)]' : '-left-9 md:left-1/2 md:-translate-x-[calc(50%-3.5rem)]'} ${
                                                activeTimelineItem === index ? 'bg-indigo-600 ring-4 ring-indigo-200' : 'bg-gray-400'
                                            }`}></div>

                                            {/* Compact card */}
                                            <div className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                                                activeTimelineItem === index
                                                    ? 'bg-white border-indigo-300 shadow-sm scale-[1.02]'
                                                    : 'bg-gray-50 border-gray-200 hover:bg-white'
                                            } ${index % 2 === 0 ? 'md:mr-auto md:max-w-[calc(50%-4rem)]' : 'md:ml-auto md:max-w-[calc(50%-4rem)]'}`}>
                                                <div className="flex items-baseline gap-2">
                                                <span className={`text-sm font-medium ${
                                                    activeTimelineItem === index ? 'text-indigo-600' : 'text-gray-500'
                                                }`}>{milestone.year}</span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <h3 className="text-sm font-semibold text-gray-800">{milestone.title}</h3>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{milestone.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-gray-500 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-16">By The Numbers</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="flex justify-center mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="md:text-3xl text-2xl font-bold mb-2">{stat.value}</div>
                                    <div className="md:text-lg">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 backdrop-blur-sm bg-black/80 text-black">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-white mb-4">Meet Our Leadership</h2>
                        <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                            The passionate professionals driving our success
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold">{member.name}</h3>
                                        <p className="text-indigo-600 mb-3">{member.role}</p>
                                        <p className="text-gray-600">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-20 bg-gray-50 hover-text-black text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-black text-center mb-4">Our Core Services</h2>
                        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
                            Comprehensive logistics solutions tailored to your needs
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-black hover:bg-white p-8 rounded-xl shadow-xl flex flex-col items-center text-center hover:text-black transition-colors"
                                >
                                    <div className="bg-indigo-100 p-4 rounded-full mb-4 text-black transition-colors">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl  font-semibold">{service.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </MainLayout>
    );
}
