import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
    title: string;
    description: string;
    long_description?: string;
    image?: string;
    features?: string[];
    benefits?: string[];
    process_steps?: string[];
}

interface ServiceDetailModalProps {
    service: Service | null;
    onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Trigger animation when service changes
        if (service) {
            setIsOpen(true);
        }
    }, [service]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300); // Wait for animation to complete
    };

    if (!service) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>

                    {/* Modal container */}
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <motion.div
                            className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                        >
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-gray-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="text-gray-600" />
                            </button>

                            {/* Modal content */}
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image section */}
                                <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden">
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>

                                {/* Content section */}
                                <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                                            <p className="text-gray-600">{service.description}</p>
                                        </div>

                                        {service.long_description && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Details</h3>
                                                <p className="text-gray-600">{service.long_description}</p>
                                            </div>
                                        )}

                                        {service.features && service.features.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h3>
                                                <ul className="space-y-2">
                                                    {service.features.map((feature, index) => (
                                                        <motion.li
                                                            key={index}
                                                            className="flex items-start"
                                                            initial={{ x: -20, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <ChevronRight className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                                            <span className="text-gray-700">{feature}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {service.benefits && service.benefits.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits</h3>
                                                <ul className="space-y-2">
                                                    {service.benefits.map((benefit, index) => (
                                                        <motion.li
                                                            key={index}
                                                            className="flex items-start"
                                                            initial={{ x: -20, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <ChevronRight className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                                            <span className="text-gray-700">{benefit}</span>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {service.process_steps && service.process_steps.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Process Steps</h3>
                                                <ol className="space-y-2">
                                                    {service.process_steps.map((step, index) => (
                                                        <motion.li
                                                            key={index}
                                                            className="flex items-start"
                                                            initial={{ x: -20, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-2 text-sm font-medium">
                                                                {index + 1}
                                                            </span>
                                                            <span className="text-gray-700">{step}</span>
                                                        </motion.li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ServiceDetailModal;