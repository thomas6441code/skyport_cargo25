import { useState, useEffect } from 'react';
import TrackingHelp from "@/components/Tracking/TrackingHelp";

interface Faqs {
    'id': number;
    'question': string;
    'answer': string;
    'category': string;
}

interface FetchingState {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string;
    fieldErrors: Record<string, string[]>;
}


const FaqSection = ({ faqs }: { faqs: Faqs[] }) => {

    return (

        <div className="mx-auto pt-10 md:max-w-[80vw] w-[100vw] px-3">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Mostly Asked Question</h2>
                <div className="w-16 h-1 bg-sky-500 mx-auto mb-4"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Choose the perfect logistics solution for your business needs, We are here to answer you.
                </p>
            </div>
            <TrackingHelp title='' faqs={faqs} />
        </div>

    );
};

export default FaqSection;
