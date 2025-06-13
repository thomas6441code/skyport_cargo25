import { useState } from 'react';

interface Faqs {
    'id': number;
    'question': string;
    'answer': string;
    'category': string;
}

const TrackingHelp = ({ faqs, title }: { faqs: Faqs[], title: string }) => {
    const [activeIndex, setActiveIndex] = useState(10);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? 10 : index);
    };

    return (
        <div className="bg-white rounded-lg shadow-md text-black overflow-hidden ">
            <h3 className="text-lg font-semibold bg-gray-100 px-4 py-3 border-b border-gray-200">
                {title}
            </h3>
            <div className="divide-y divide-gray-200">
                {faqs.map((faq: any, index: number) => (
                    <div key={index} className="transition-all duration-200">
                        <button
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            onMouseEnter={() => toggleAccordion(index)}
                            aria-expanded={activeIndex === index}
                            aria-controls={`faq-content-${index}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-gray-500 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </button>
                        <div
                            id={`faq-content-${index}`}
                            className={`px-4 pb-3 pt-1 text-gray-600 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackingHelp;
