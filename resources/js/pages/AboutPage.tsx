import { useState } from 'react';
import { GoalIcon, Clock, Globe, Trophy, Shield, Truck, Plane, Ship, Warehouse, ArrowRight, Check, ShieldBanIcon, GlobeIcon, VenusIcon, LucideGoal } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { Link } from "@inertiajs/react";
import IconComponent from '@/components/common/IconComponent';
import WhatWeDoSection from '@/components/Home/WhatWeDoSection';


interface Service {
    id: number;
    slug: string;
    image: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    link: string;
    longDescription?: string;
    benefits?: string[];
    processSteps?: string[];
}

interface Stats {
    id: number;
    icon: string;
    label: string;
    value: string;
}

interface Team {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
}

interface Image {
    id: number;
    title: string;
    slide_url: string;
}

interface CompanyData {
    id?: number;
    vision: string;
    mission: string;
    core_values: string[];
}

interface Props {
    image: Image;
    companydata:CompanyData; 
    stats: Stats[];
    services: Service[];
    teamMembers: Team[];
}

export default function AboutUs({ companydata, services, stats, teamMembers, image }: Props) {
    const [activeTimelineItem, setActiveTimelineItem] = useState(3);

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

    return (
        <MainLayout>
            {/* Content Overlay */}
            <div className="relative z-0 overflow-hidden bg-black">
                {/* Abstract logistics shapes in blurred background */}
                <div className="absolute inset-0 z-[-1] h-full overflow-hidden">
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

                <div className="relative z-10">
                    {/* Top Section */}
                    <div className="relative h-[90vh] md:min-h-[600px] max-h-[630px] md:pt-28 py-3">
                        {/* 3D World Animation Container */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
                            <div className="relative w-full h-full">
                                {/* Sample 3D World Animation - Replace with your actual 3D asset */}
                                <div
                                    className={`w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-transform duration-1000`}
                                    style={{
                                        backgroundImage: `url('/images/slides/${image?.slide_url}')`,
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
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 md:mt-10 to-black/95 flex items-center">
                            <div className="container mx-auto px-4 text-white">
                                <div className="max-w-5xl py-5 relative z-10">
                                    <h1 className="text-5xl md:mt-10 lg:text-6xl font-bold leading-tight">
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
                                        <Link href='/' className="bg-blue-600 hover:bg-blue-700 px-4 py-4 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                                            Get Consultation <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



		   <div className="bg-white text-center py-14 z-30">
	                <div className="text-center mb-14">
	                    <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-medium uppercase tracking-wider mb-3">                        			Our Philosophy
	                    </span>
	                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
	                        Precision in Motion
	                    </h2>
	                    <div className="relative max-w-2xl mx-auto">
	                        <p className="text-gray-600 leading-relaxed">
	                          Redefining global logistics with intelligent technology, precision execution,
	                         and sustainable innovation - moving businesses forward while bringing the world closer together.
                                </p>
	                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-sky-500"></div>
	                    </div>
	                </div>
	                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 mx-auto container">
	                    {/* Vision Card */}
	                    <div className="py-10 grid grid-cols-1 gap-6">
	                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
	                            <div className="flex items-center mb-4">
	                                <div className="bg-sky-100 p-2 rounded-lg mr-3">
	                                    <GlobeIcon className="w-6 h-6 text-sky-600" />
	                                </div>
	                                <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
	                            </div>
	                            <p className="text-gray-600 text-sm text-left leading-relaxed">
	                                {companydata.vision}
	                            </p>
	                        </div>
	                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
	                            <div className="flex items-center mb-4">
	                                <div className="bg-sky-100 p-2 rounded-lg mr-3">
	                                    <GoalIcon className="w-6 h-6 text-sky-600" />
	                                </div>
	                                <h3 className="text-xl font-semibold text-gray-900">Our Goal</h3>
	                            </div>
	                            <p className="text-gray-600 text-sm text-left leading-relaxed">
	                                {companydata.mission}
	                            </p>
	                        </div>
	                    </div>

	                     {/* Values Card */}
	                    <div className="bg-white md:m-10 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
	                        <div className="flex items-center mb-4">
	                            <div className="bg-sky-100 p-2 rounded-lg mr-3">
	                                <ShieldBanIcon className="w-6 h-6 text-sky-600" />
	                            </div>
	                            <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
	                        </div>
	                        <ul className="space-y-3">
	                            {companydata?.core_values?.map((value, index) => (
	                                <li key={index} className="flex items-start">
	                                    <div className="mt-1 mr-2 flex-shrink-0">
	                                        <Check className="w-4 h-4 text-sky-500" />
	                                    </div>
	                                    <span className="text-gray-600 text-sm text-left">{value}</span>
	                                </li>
	                            ))}
	                        </ul>
	                    </div>
	                </div>
	            </div>

                    <WhatWeDoSection services={services} />

                    {/* Stats Section */}
                    <section className="py-20 bg-gray-700 text-white">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-white mb-4">OUR NUMBERS</h2>
                                <div className="w-32 h-1.5 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
                                <p className="text-xl text-gray-50 max-w-3xl mx-auto">
                                    Accelerating trade between China and Tanzania with innovative supply chain management
                                </p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                                        <div className="flex justify-center mb-4">
                                            <IconComponent icon={stat.icon} />
                                        </div>
                                        <div className="md:text-3xl text-2xl font-bold mb-2">{stat.value}</div>
                                        <div className="md:text-lg">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Team Section
                    <section className="py-20 backdrop-blur-sm text-black">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-center text-white mb-4">Meet Our Leadership</h2>
                            <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                                The passionate professionals driving our success
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:px-0 px-4">
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        <img
                                            src={member.image_url}
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
                    </section> */}

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
                                            <div className="flex justify-center">
                                                <IconComponent icon={service.icon} />
                                            </div>
                                        </div>
                                        <h3 className="text-xl  font-semibold">{service.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </MainLayout >
    );
}
