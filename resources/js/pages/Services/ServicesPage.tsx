import MainLayout from "@/layouts/MainLayout";
import ServicesCard from '@/components/common/ServicesCard';
import IconComponent from '@/components/common/IconComponent';

interface Service {
    id: number;
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

interface Stats {
    id: number;
    icon: string;
    value: string;
    label: string;
}

interface Service2 {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    features: string[];
    ctaText?: string;
    ctaLink?: string;
}

interface Props {
    services: Service[];
    services2: Service2[];
    stats: Stats[];

}

const ServicesIndex = ({ services, stats }: Props) => {

    const services2: Service2[] = [
        {
            id: 1,
            title: 'International Shipping',
            description: 'Reliable global shipping solutions with real-time tracking and customs clearance.',
            imageUrl: '/images/services/international-shipping.jpg',
            features: [
                'Door-to-door delivery',
                'Customs clearance included',
                'Real-time tracking',
                'Dedicated account manager'
            ],
            ctaText: 'Get a Quote',
            ctaLink: '/quote'
        },
        {
            id: 2,
            title: 'Warehousing Solutions',
            description: 'Secure storage facilities with inventory management and distribution services.',
            imageUrl: '/images/services/warehousing.jpg',
            features: [
                'Climate-controlled facilities',
                '24/7 security monitoring',
                'Inventory management system',
                'Just-in-time delivery'
            ],
            ctaText: 'View Facilities',
            ctaLink: '/warehousing'
        },
        {
            id: 3,
            title: 'Local Distribution',
            description: 'Efficient last-mile delivery network for your local shipments.',
            imageUrl: '/images/services/local-distribution.jpg',
            features: [
                'Same-day delivery available',
                'Fleet of modern vehicles',
                'Professional handling',
                'Proof of delivery'
            ]
        }
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
                                    backgroundImage: `url('/images/transport-logistics.webp')`,
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
                        <div className="container mx-auto px-4 flex flex-col items-center text-center text-gray-100">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 ">China-Tanzania Logistics Solutions</h1>
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
                <div className="container mx-auto  md:w-full w-[85%] px-4 -mt-10 z-10 relative">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/20 backdrop-blur-xs hover:bg-white/10 p-6 rounded-xl shadow-xl flex items-center">
                                <div className="bg-sky-100 p-3 rounded-lg mr-4 text-sky-600">
                                    <IconComponent icon={stat.icon} />
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
                    <div className="px-4">
                        <div className="text-center mb-5">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Core Services</h2>
                            <div className="w-16 h-1 bg-sky-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Comprehensive logistics solutions tailored to your business needs
                            </p>
                        </div>

                        <ServicesCard services={services} />
                    </div>
                </section>


                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                            Our Logistics Services
                        </h2>

                        <div className="space-y-24">
                            {services2.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                                >
                                    {/* Image Section */}
                                    <div className="w-full md:w-1/2 h-96 overflow-hidden rounded-xl shadow-lg">
                                        <img
                                            src={service.imageUrl}
                                            alt={service.title}
                                            className="w-full h-full object-cover object-center"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full md:w-1/2 space-y-4">
                                        <h3 className="text-3xl font-bold text-gray-800">{service.title}</h3>
                                        <p className="text-lg text-gray-600">{service.description}</p>

                                        <ul className="space-y-2 mt-6">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-start">
                                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {service.ctaText && service.ctaLink && (
                                            <div className="mt-8">
                                                <a
                                                    href={service.ctaLink}
                                                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                                                >
                                                    {service.ctaText}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
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