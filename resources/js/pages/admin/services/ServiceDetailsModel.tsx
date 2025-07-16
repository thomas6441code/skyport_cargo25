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
    pricing?: string;
    duration?: string;
    requirements?: string[];
    faqs?: { question: string; answer: string }[];
}

interface ServiceDetailModalProps {
    service: Service | null;
    onClose: () => void;
    layout?: 'split' | 'full' | 'auto';
    showAllData?: boolean;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
    service,
    onClose,
    layout = 'auto',
    showAllData = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (service) {
            setIsOpen(true);
            const initialSections = {
                description: !isMobile,
                long_description: !isMobile,
                features: !isMobile,
                benefits: !isMobile,
                process_steps: !isMobile,
                pricing: !isMobile,
                requirements: !isMobile,
                faqs: !isMobile
            };
            setExpandedSections(initialSections);
        }
    }, [service, isMobile]);

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

    const shouldShow = (data: any) => showAllData || (data && (Array.isArray(data) ? data.length > 0 : true));

    const getLayoutClasses = () => {
        if (layout === 'full') return { container: 'flex-col', image: 'w-full h-64', content: 'w-full' };
        if (layout === 'split') return { container: 'flex-col lg:flex-row', image: 'lg:w-1/2 h-64 lg:h-auto', content: 'lg:w-1/2' };
        return {
            container: isMobile ? 'flex-col' : 'flex-col lg:flex-row',
            image: isMobile ? 'w-full h-64' : 'lg:w-1/2 h-64 lg:h-auto',
            content: isMobile ? 'w-full' : 'lg:w-1/2'
        };
    };

    const layoutClasses = getLayoutClasses();

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
                    <div 
                        className="fixed inset-0 bg-black/50" 
                        onClick={handleClose}
                        onTouchStart={handleClose}
                    ></div>

                    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
                        <motion.div
                            className={`relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col ${isMobile ? 'mx-2' : ''}`}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-gray-100 active:scale-95 transition-all"
                                aria-label="Close modal"
                            >
                                <X className="text-gray-600 w-5 h-5" />
                            </button>

                            {/* Main content container with proper scrolling */}
                            <div className={`flex ${layoutClasses.container} flex-1 overflow-hidden`}>
                                {(service.image || showAllData) && (
                                    <div className={`${layoutClasses.image} relative flex-shrink-0 overflow-hidden`}>
                                        {service.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-gray-500">No image available</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                        
                                        {isMobile && (
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Scrollable content area */}
                                <div className={`${layoutClasses.content} overflow-y-auto`}>
                                    <div className="p-4 md:p-6 space-y-4">
                                        {!isMobile && (
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                {service.title}
                                            </h2>
                                        )}

                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <div
                                                className="flex items-center justify-between cursor-pointer"
                                                onClick={() => toggleSection('description')}
                                            >
                                                <h3 className="text-lg font-semibold text-gray-800">Overview</h3>
                                                {expandedSections.description ? (
                                                    <ChevronUp className="text-gray-500" />
                                                ) : (
                                                    <ChevronDown className="text-gray-500" />
                                                )}
                                            </div>
                                            {expandedSections.description && (
                                                <div className="text-gray-600 mt-2">
                                                    {service.description}
                                                </div>
                                            )}
                                        </div>

                                        {shouldShow(service.long_description) && (
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => toggleSection('long_description')}
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-800">Details</h3>
                                                    {expandedSections.long_description ? (
                                                        <ChevronUp className="text-gray-500" />
                                                    ) : (
                                                        <ChevronDown className="text-gray-500" />
                                                    )}
                                                </div>
                                                {expandedSections.long_description && (
                                                    <div className="text-gray-600 mt-2 whitespace-pre-line space-y-2 overflow-auto max-h-[50vh]">
                                                        {service.long_description || 'No detailed information provided'}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {shouldShow(service.features) && (
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => toggleSection('features')}
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {service.features?.length ? `Features (${service.features.length})` : 'Features'}
                                                    </h3>
                                                    {expandedSections.features ? (
                                                        <ArrowDownRight className="text-gray-500 h-5 w-5" />
                                                    ) : (
                                                        <ArrowUpLeft className="text-gray-500 h-5 w-5" />
                                                    )}
                                                </div>
                                                {expandedSections.features && (
                                                    <ul className="space-y-2 mt-2 overflow-auto max-h-[50vh]">
                                                        {service.features?.length ? (
                                                            service.features.map((feature, index) => (
                                                                <motion.li
                                                                    key={index}
                                                                    className="flex items-start bg-white p-2 rounded-md"
                                                                    initial={{ x: -20, opacity: 0 }}
                                                                    animate={{ x: 0, opacity: 1 }}
                                                                    transition={{ delay: index * 0.05 }}
                                                                >
                                                                    <ChevronRight className="text-blue-500 mt-0.5 mr-2 flex-shrink-0 w-4 h-4" />
                                                                    <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                                                                </motion.li>
                                                            ))
                                                        ) : (
                                                            <li className="text-gray-500 text-sm">No features listed</li>
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        )}

                                        {shouldShow(service.benefits) && (
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => toggleSection('benefits')}
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {service.benefits?.length ? `Benefits (${service.benefits.length})` : 'Benefits'}
                                                    </h3>
                                                    {expandedSections.benefits ? (
                                                        <ArrowDownRight className="text-gray-500 h-5 w-5" />
                                                    ) : (
                                                        <ArrowUpLeft className="text-gray-500 h-5 w-5" />
                                                    )}
                                                </div>
                                                {expandedSections.benefits && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 overflow-auto max-h-[50vh]">
                                                        {service.benefits?.length ? (
                                                            service.benefits.map((benefit, index) => (
                                                                <motion.div
                                                                    key={index}
                                                                    className="bg-white p-3 rounded-md shadow-sm"
                                                                    initial={{ y: 10, opacity: 0 }}
                                                                    animate={{ y: 0, opacity: 1 }}
                                                                    transition={{ delay: index * 0.05 }}
                                                                >
                                                                    <div className="flex items-start">
                                                                        <ChevronRight className="text-green-500 mt-0.5 mr-2 flex-shrink-0 w-4 h-4" />
                                                                        <span className="text-gray-700 text-sm md:text-base">{benefit}</span>
                                                                    </div>
                                                                </motion.div>
                                                            ))
                                                        ) : (
                                                            <div className="text-gray-500 text-sm">No benefits listed</div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {shouldShow(service.process_steps) && (
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => toggleSection('process_steps')}
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {service.process_steps?.length ? `Process (${service.process_steps.length} steps)` : 'Process'}
                                                    </h3>
                                                    {expandedSections.process_steps ? (
                                                        <ArrowDownRight className="text-gray-500 h-5 w-5" />
                                                    ) : (
                                                        <ChevronDown className="text-gray-500 h-5 w-5" />
                                                    )}
                                                </div>
                                                {expandedSections.process_steps && (
                                                    <ol className="space-y-3 mt-2 overflow-auto max-h-[50vh]">
                                                        {service.process_steps?.length ? (
                                                            service.process_steps.map((step, index) => (
                                                                <motion.li
                                                                    key={index}
                                                                    className="flex items-start bg-white p-3 rounded-md shadow-sm"
                                                                    initial={{ y: 10, opacity: 0 }}
                                                                    animate={{ y: 0, opacity: 1 }}
                                                                    transition={{ delay: index * 0.05 }}
                                                                >
                                                                    <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-600 rounded-full mr-3 text-xs font-medium flex-shrink-0">
                                                                        {index + 1}
                                                                    </span>
                                                                    <span className="text-gray-700 text-sm md:text-base">{step}</span>
                                                                </motion.li>
                                                            ))
                                                        ) : (
                                                            <li className="text-gray-500 text-sm">No process steps defined</li>
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
