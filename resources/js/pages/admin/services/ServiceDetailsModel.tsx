import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronDown, ChevronUp, ArrowDownRight, ArrowUpLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
    title: string;
    description: string;
    long_description?: string;
    image?: string;
    features?: string[];
    benefits?: string[];
    process_steps?: string[];
    // Additional optional fields for maximum flexibility
    pricing?: string;
    duration?: string;
    requirements?: string[];
    faqs?: { question: string; answer: string }[];
}

interface ServiceDetailModalProps {
    service: Service | null;
    onClose: () => void;
    layout?: 'split' | 'full' | 'auto'; // Flexible layout options
    showAllData?: boolean; // Force show all sections even if empty
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
    service,
    onClose,
    layout = 'split',
    showAllData = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (service) {
            setIsOpen(true);
            // Initialize all sections as expanded
            const sections = {
                description: true,
                long_description: true,
                features: true,
                benefits: true,
                process_steps: true,
                pricing: true,
                requirements: true,
                faqs: true
            };
            setExpandedSections(sections);
        }
    }, [service]);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (!service) return null;

    // Determine if we should show a section (has data or showAllData is true)
    const shouldShow = (data: any) => showAllData || (data && (Array.isArray(data) ? data.length > 0 : true));

    // Dynamic layout classes
    const layoutClasses = {
        container: layout === 'split' ? 'flex-col md:flex-row' : 'flex-col',
        image: layout === 'split' ? 'md:w-1/2 h-64 md:h-full' : 'w-full h-64',
        content: layout === 'split' ? 'md:w-1/2' : 'w-full'
    };

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
                            className={`relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${layout === 'full' ? 'w-full max-w-6xl' : ''}`}
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
                            <div className={`flex ${layoutClasses.container} h-full`}>
                                {/* Image section - only show if image exists or showAllData is true */}
                                {(service.image || showAllData) && (
                                    <div className={`${layoutClasses.image} flex-col items-center`}>
                                        <div className={`relative overflow-hidden`}>
                                            {service.image ? (
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500">No image available</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />


                                        </div>

                                        <div className="flex-col justify-between items-start p-4">

                                            {/* Description - always shown */}
                                            <div>
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => toggleSection('description')}
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                                                    {expandedSections.description ? <ChevronUp /> : <ChevronDown />}
                                                </div>
                                                {expandedSections.description && (
                                                    <p className="text-gray-600 mt-2">{service.description}</p>
                                                )}
                                            </div>

                                            {/* Long Description */}
                                            {shouldShow(service.long_description) && (
                                                <div>
                                                    <div
                                                        className="flex items-center justify-between cursor-pointer"
                                                        onClick={() => toggleSection('long_description')}
                                                    >
                                                        <h3 className="text-lg font-semibold text-gray-800">Detailed Information</h3>
                                                        {expandedSections.long_description ? <ChevronUp /> : <ChevronDown />}
                                                    </div>
                                                    {expandedSections.long_description && (
                                                        <p className="text-gray-600 mt-2 whitespace-pre-line">
                                                            {service.long_description || 'No detailed information provided'}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Content section */}
                                <div className={`${layoutClasses.content} p-4 md:p-6 overflow-y-auto`}>
                                    <div className="space-y-6">
                                        <h2 className="text-3xl mb-4 mt-2 font-bold text-gray-900">{service.title}</h2>

                                        {/* Features */}
                                        {shouldShow(service.features) && (
                                            <div>
                                                <div
                                                    className="flex items-center gap-4 cursor-pointer"
                                                    onClick={() => toggleSection('features')}
                                                >
                                                    <h3 className="text-md font-semibold text-gray-800">
                                                        {service.features?.length ? `Key Features (${service.features.length})` : 'Features'}
                                                    </h3>
                                                    {expandedSections.features ? <ArrowDownRight className='text-gray-500 h-6 w-6' /> : <ArrowUpLeft className='text-gray-500 h-6 w-6' />}
                                                </div>
                                                {expandedSections.features && (
                                                    <ul className="space-y-2 mt-2">
                                                        {(service.features && service.features.length > 0) ? (
                                                            service.features.map((feature, index) => (
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
                                                            ))
                                                        ) : (
                                                            <li className="text-gray-500">No features listed</li>
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        )}

                                        {/* Benefits */}
                                        {shouldShow(service.benefits) && (
                                            <div>
                                                <div
                                                    className="flex items-center gap-4 cursor-pointer"
                                                    onClick={() => toggleSection('benefits')}
                                                >
                                                    <h3 className="text-md font-semibold text-gray-800 ">
                                                        {service.benefits?.length ? `Benefits (${service.benefits.length})` : 'Benefits'}
                                                    </h3>
                                                    {expandedSections.benefits ? <ArrowDownRight className='text-gray-500 h-6 w-6' /> : <ArrowUpLeft className='text-gray-500 h-6 w-6' />}
                                                </div>
                                                {expandedSections.benefits && (
                                                    <ul className="space-y-2 mt-2">
                                                        {(service.benefits && service.benefits.length > 0) ? (
                                                            service.benefits.map((benefit, index) => (
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
                                                            ))
                                                        ) : (
                                                            <li className="text-gray-500">No benefits listed</li>
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        )}

                                        {/* Process Steps */}
                                        {shouldShow(service.process_steps) && (
                                            <div>
                                                <div
                                                    className="flex items-center gap-4 cursor-pointer"
                                                    onClick={() => toggleSection('process_steps')}
                                                >
                                                    <h3 className="text-md font-semibold text-gray-800 ">
                                                        {service.process_steps?.length ? `Process Steps (${service.process_steps.length})` : 'Process'}
                                                    </h3>
                                                    {expandedSections.process_steps ? <ArrowDownRight className='h-6 w-6 text-gray-500' /> : <ChevronDown className='h-6 w-6 text-gray-500' />}
                                                </div>
                                                {expandedSections.process_steps && (
                                                    <ol className="space-y-2 mt-2">
                                                        {(service.process_steps && service.process_steps.length > 0) ? (
                                                            service.process_steps.map((step, index) => (
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
                                                            ))
                                                        ) : (
                                                            <li className="text-gray-500">No process steps defined</li>
                                                        )}
                                                    </ol>
                                                )}
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