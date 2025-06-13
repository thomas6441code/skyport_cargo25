import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    Globe,
    Shield,
    Truck,
    Thermometer,
    Package,
    FileText,
    BarChart2,
    Users,
    Settings,
    ArrowRight
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const iconComponents = {
    Clock,
    Shield,
    Truck,
    Thermometer,
    Globe,
    Package,
    FileText,
    BarChart2,
    Users,
    Settings
};

interface Service {
    service: {
        slug: string;
        title: string;
        image: string;
        description: string;
        long_description: string;
        features: string[];
        benefits: string[];
        process_steps: string[];
    };
    testimonials?: {
        name: string;
        role: string;
        image: string;
        content: string;
    }[];
    faqs?: {
        question: string;
        answer: string;
    }[];
}

interface ServiceShowProps {
    services: Service;
    featureIcons: Record<string, keyof typeof iconComponents>;
}

export default function ServiceShow({ services, featureIcons }: ServiceShowProps) {

    return (

        <MainLayout>

            <div className="bg-white">
                <Head title={`${services.service?.title} | Our services.Services`}>
                    <meta name="description" content={services.service?.description} />
                    <meta property="og:image" content={services.service?.image} />
                </Head>

                {/* Hero Section */}
                <div className="relative bg-gray-900 rounded-br-[80%] md:rounded-br-full py-14">
                    <div className="absolute inset-0 overflow-hidden rounded-br-[80%] md:rounded-br-full">
                        <img
                            src={services.service?.image}
                            alt={services.service?.title}
                            className="h-full w-full object-cover opacity-50"
                            loading="eager"
                        />
                    </div>
                    <div className="relative mt-16 max-w-7xl mx-auto py-24 px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl font-bold  tracking-tight text-white sm:text-5xl lg:text-6xl">
                                {services.service?.title}
                            </h1>
                            <p className="mt-6 text-xl md:w-full w-[80%] text-gray-300">
                                {services.service?.description}
                            </p>
                            <div className="mt-8 flex gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Get Started
                                    <ArrowRight className="ml-1.5 h-4 w-4" />
                                </Link>
                                <Link
                                    href="#features"
                                    className="inline-flex items-center rounded-md bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <section className="mb-16">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Overview</h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>{services.service?.long_description}</p>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Key Benefits</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {services.service?.benefits?.map((benefit, i) => (
                                        <div key={i} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                            <CheckCircle2 className="flex-shrink-0 h-5 w-5 text-emerald-500 mt-0.5 mr-3" />
                                            <p className="text-gray-700 text-sm">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Our Process</h2>
                                <div className="space-y-4">
                                    {services.service?.process_steps?.map((step, i) => (
                                        <div key={i} className="flex">
                                            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 mt-0.5 mr-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <p className="text-gray-700 text-sm"><span className="font-medium">Step {i + 1}:</span> {step}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {services?.testimonials && services?.testimonials?.length > 0 && (
                                <section className="mb-16">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Testimonials</h2>
                                    <div className="grid gap-8 md:grid-cols-2">
                                        {services.testimonials?.map((testimonial, i) => (
                                            <blockquote key={i} className="bg-gray-50 p-6 rounded-lg">
                                                <div className="prose prose-lg text-gray-600 mb-4">
                                                    <p>"{testimonial.content}"</p>
                                                </div>
                                                <footer className="flex items-center">
                                                    <div className="ml-4">
                                                        <img
                                                            src={testimonial?.image}
                                                            alt={testimonial?.name}
                                                            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-indigo-100"
                                                        />
                                                        <div className="text-base font-medium text-gray-900">{testimonial.name}</div>
                                                        <div className="text-base text-gray-500">{testimonial.role}</div>
                                                    </div>
                                                </footer>
                                            </blockquote>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {services?.faqs && services?.faqs.length > 0 && (
                                <section className="mb-16">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                                    <div className="divide-y divide-gray-200">
                                        {services.faqs?.map((faq, i) => (
                                            <div key={i} className="py-6">
                                                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                                                <div className="prose text-sm prose-lg text-gray-600">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg sticky top-40">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Service Highlights</h3>
                                <ul className="space-y-4">
                                    {services.service?.features?.slice(0, 5).map((feature, i) => {
                                        const IconComponent = iconComponents[featureIcons[feature]] || CheckCircle2;
                                        return (
                                            <li key={i} className="flex items-start">
                                                <span className="text-blue-600 mr-3">
                                                    <IconComponent className="h-5 w-5" />
                                                </span>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="mt-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Get a Quote</h3>
                                    <p className="text-gray-600 mb-2">Ready to use our {services.service?.title} service?</p>
                                    <Link
                                        href="/quotes"
                                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md transition-colors font-medium"
                                    >
                                        Request Quote
                                    </Link>
                                </div>
                                <div className="bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-900 my-4">Related Services</h3>
                                    <ul className="space-y-2">
                                        {[
                                            { title: "Air Freight", link: "/services/air-freight" },
                                            { title: "Export Services", link: "/services/export-services" },
                                            { title: "Customs Clearance", link: "/services/customs-clearance" },
                                            { title: "Out Sourcing", link: "/services/outsourcing" }
                                        ].map((related, i) => (
                                            (related.title == services.service.title) ?
                                                <>

                                                </> :
                                                <li key={i}>
                                                    <Link
                                                        href={related.link}
                                                        className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        <ArrowRight className="h-4 w-4 mr-2" />
                                                        {related.title}
                                                    </Link>
                                                </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>


    );
}