import { CheckCircle } from 'lucide-react';

interface QuoteProcessProps {
    steps: string[];
}

export function QuoteProcess({ steps }: QuoteProcessProps) {
    return (
        <div className="p-3">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Simple 4-Step Process</h3>

            <div className="relative">
                {/* Progress line */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 -translate-x-1/2"></div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex items-start">
                            {/* Step indicator */}
                            <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100">
                                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Step content */}
                            <div className="ml-4">
                                <h4 className="font-medium text-gray-900">{step}</h4>
                                {index === steps.length - 1 && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        Relax while we manage your shipment end-to-end
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-start">
                <CheckCircle className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5" />
                <p className="ml-3 text-sm text-blue-700">
                    <span className="font-semibold">Fast & Transparent:</span> No hidden fees, all-inclusive rates
                </p>
            </div>
        </div>
    );
}
