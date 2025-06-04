import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

interface Service {
    slug: string;
    image: string;
    title: string;
    description: string;
    features: string[];
    link: string;
    longDescription?: string;
    benefits?: string[];
    processSteps?: string[];
}

export default function ServicesIndex({ services }: { services: Service[] }) {

    console.log(services);


    return (
        <MainLayout>

            <div className="bg-gray-50 py-16 sm:py-24">
                <Head title="Our Services" />

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Our Logistics Services
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Comprehensive solutions tailored to your supply chain needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <ServiceCard key={service.slug} service={service} />
                        ))}
                    </div>
                </div>
            </div>

        </MainLayout>

    );
}

function ServiceCard({ service }: { service: Service }) {
    return (
        <div className="group relative overflow-hidden text-black rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h2>
                <p className="mb-4 text-gray-600">{service.description}</p>

                <ul className="mb-6 space-y-2">
                    {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500 mt-0.5 mr-2" />
                            <span className="text-gray-700">{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 group-hover:underline"
                >
                    View details
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}