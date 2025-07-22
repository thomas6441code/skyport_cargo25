import MainLayout from "@/layouts/MainLayout";
import ServicesCard from '@/components/common/ServicesCard';
import IconComponent from '@/components/common/IconComponent';
import { motion } from "framer-motion";

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

interface Image {
    id: number;
    title: string;
    slide_url: string;
}

interface Props {

    services: Service[];
    services2: Service2[];
    stats: Stats[];
    image: Image;

}

const ServicesIndex = ({ services, stats, image }: Props) => {

    return (
        <MainLayout>

            <div className="min-h-screen md:pt-10 bg-white">
                {/* Top Section */}
                <div className="relative h-[90vh] min-h-[200px] max-h-[530px] md:rounded-b-[5rem] rounded-b-[2.5rem] pt-24 py-3">
                    {/* 3D World Animation Container */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden md:rounded-b-[5rem] rounded-b-[2.5rem] flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <div
                                className={`w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-transform duration-1000`}
                                style={{
                                    backgroundImage: `url('/images/slides/${image?.slide_url}')`,
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
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/95 md:rounded-b-[5rem] rounded-b-[2.5rem] flex items-center">
                        <div className="container mx-auto px-4 flex flex-col items-center text-center text-gray-100">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 ">China-Tanzania Logistics Solutions</h1>
                            <p className="text-xl max-w-2xl mb-8 opacity-90">
                                Connecting your business to the world with reliable, efficient transportation
                            </p>
                            <div className="flex gap-4">
                           
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="container mx-auto w-full px-4 -mt-10 z-10 relative">
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
                <section className="relative pt-10 overflow-hidden bg-white">
                    {/* Diagonal background */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-100 to-blue-50 transform -skew-y-6 origin-top-left"></div>
                    </div>
                    <div className="md:px-4">
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

		{/* Services Showcase Section */}
		<section className="py-20 px-4 md:px-16 bg-gradient-to-b from-gray-50 to-white">
		    <div className="max-w-7xl mx-auto">
		        {/* Section Header */}
		        <div className="text-center mb-16">
		            <span className="inline-block px-3 py-1 text-sm font-semibold text-sky-600 bg-sky-100 rounded-full mb-4">
		                Our Premium Services
		            </span>
		            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
		                Seamless <span className="text-sky-600">Logistics</span> Solutions
		            </h2>
		            <div className="w-20 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto mb-6 rounded-full"></div>
		            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
		                Tailored transportation services designed to meet your unique business requirements
		            </p>
		        </div>

		        {/* Services Grid */}
		        <div className="space-y-28">
		            {services.map((service, index) => (
		                <motion.div
		                    key={service.id}
		                    initial={{ opacity: 0, y: 50 }}
		                    whileInView={{ opacity: 1, y: 0 }}
		                    transition={{ duration: 0.6, delay: index * 0.15 }}
		                    viewport={{ once: true, margin: "-100px" }}
		                    className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
		                >
		                    {/* Decorative Element */}
		                    <div className={`absolute hidden md:block -z-10 w-32 h-32 rounded-full opacity-10 ${index % 2 === 0 ? 'bg-blue-500 -left-16 -bottom-16' : 'bg-emerald-500 -right-16 -top-16'}`}></div>

		                    {/* Image Section */}
		                    <div className="w-full md:w-1/2 h-80 md:h-[32rem] relative group">
		                        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-50 rounded-2xl shadow-lg transform rotate-1 -z-10"></div>
		                        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
		                            <img
		                                src={service.image}
		                                alt={service.title}
		                                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
		                                loading="lazy"
		                            />
		                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
		                            <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
		                                <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-black/30 backdrop-blur-sm rounded-full border border-white/20">
		                                    {service.features.length}+ Features
		                                </span>
		                            </div>
		                        </div>
		                    </div>

		                    {/* Content Section */}
		                    <div className="w-full md:w-1/2 space-y-6">
		                        <div className="flex items-center gap-3">
		                            <div className={`h-1.5 w-8 rounded-full ${index % 2 === 0 ? 'bg-gradient-to-r from-sky-400 to-blue-600' : 'bg-gradient-to-r from-emerald-400 to-teal-600'}`} />
		                            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
		                                Service 0{index + 1}
		                            </span>
		                        </div>

		                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
		                            {service.title}
		                        </h3>

		                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
		                            {service.description}
		                        </p>

		                        <ul className="space-y-4 mt-8">
		                            {service.features.map((feature, i) => (
		                                <motion.li
		                                    key={i}
		                                    initial={{ opacity: 0, x: -20 }}
		                                    animate={{ opacity: 1, x: 0 }}
		                                    transition={{ delay: 0.2 + (i * 0.1) }}
		                                    className="flex items-start group"
		                                >
		                                    <div className={`flex-shrink-0 mt-1 p-1.5 rounded-lg ${index % 2 === 0 ? 'bg-blue-100/80 group-hover:bg-blue-200' : 'bg-emerald-100/80 group-hover:bg-emerald-200'} transition-colors duration-300`}>
		                                        <svg
		                                            className={`h-5 w-5 ${index % 2 === 0 ? 'text-blue-600' : 'text-emerald-600'}`}
		                                            fill="currentColor"
		                                            viewBox="0 0 20 20"
		                                        >
		                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
		                                        </svg>
		                                    </div>
		                                    <span className="ml-4 text-lg text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
		                                </motion.li>
		                            ))}
		                        </ul>

		                        {service.slug && (
		                            <motion.div
		                                initial={{ opacity: 0 }}
		                                animate={{ opacity: 1 }}
		                                transition={{ delay: 0.5 }}
		                                className="mt-10"
		                            >
		                                <a
		                                    href={`/services/${service.slug}`}
		                                    className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl shadow-sm transition-all duration-300 ${index % 2 === 0
		                                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 hover:shadow-lg'
		                                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg'
		                                        } group`}
		                                >
		                                    Discover More
		                                    <svg className="ml-3 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
		                                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
		                                    </svg>
		                                </a>
		                            </motion.div>
		                        )}
		                    </div>
		                </motion.div>
		            ))}
		        </div>
		    </div>
		</section>

                {/* CTA Section */}
                <section className="py-16 bg-skyblue text-white">
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
