import { useState } from 'react';
import { motion } from 'framer-motion';
import IconComponent from '../common/IconComponent';

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


interface Props {
    services: Service[];
}

const WhatWeDoSection = ({ services }: Props) => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        What We Do
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Comprehensive solutions tailored to your supply chain needs
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            onMouseEnter={() => setHoveredCard(service.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className={`relative overflow-hidden rounded-xl shadow-lg p-6 transition-all duration-300 ${hoveredCard === service.id ? 'ring-2 ring-indigo-500' : ''
                                }`}
                        >
                            <div className="flex flex-col h-full p-4">
                                <div className="flex items-center mb-4">
                                    <span className="text-4xl mr-4 text-cyan-500">
                                        <IconComponent icon={service.icon} />
                                    </span>
                                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                                </div>
                                <p className="text-gray-700 mb-6 flex-grow">{service.description}</p>
                            </div>
                            {hoveredCard === service.id && (
                                <motion.div
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.1 }}
                                    className="absolute inset-0 bg-black rounded-xl"
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeDoSection;