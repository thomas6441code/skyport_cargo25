import MainLayout from '@/layouts/MainLayout';
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import TrackingInput from "@/components/Tracking/TrackingInput";
import TrackingHelp from "@/components/Tracking/TrackingHelp";
import TrackingStepper from "@/components/Tracking/TrackingStepper";

interface faq {
    id: number;
    question: string;
    answer: string;
    category: string;
};


interface TrackProps {

    faqs: faq[];

}

export default function TrackingPage({ faqs }: TrackProps) {
    // Sample data - replace with real API calls
    const sampleTrackingData = {
        trackingNumber: 'SKY123456789',
        origin: 'Shanghai, China',
        destination: 'Dar es Salaam, Tanzania',
        status: 'Departed Origin',
        estimatedDelivery: '2023-12-15',
        history: [
            {
                status: 'Shipment Picked Up',
                location: 'Shanghai Warehouse',
                timestamp: '2023-12-10 09:30',
                description: 'Package received at origin facility',
                completed: true,
                active: false
            },
            {
                status: 'Departed Origin',
                location: 'Shanghai (PVG)',
                timestamp: '2023-12-11 14:15',
                description: 'Flight SKY882 to Dar es Salaam',
                completed: false,
                active: true
            },
            {
                status: 'In Transit',
                location: 'En Route',
                timestamp: 'Estimated 2023-12-12 08:00',
                description: 'Currently in air',
                completed: false,
                active: false
            },
            {
                status: 'Arrived Destination',
                location: 'Dar es Salaam (DAR)',
                timestamp: 'Estimated 2023-12-12 14:30',
                description: 'Scheduled for customs clearance',
                completed: false,
                active: false
            }
        ]
    };

    console.log(faqs)

    return (
        <MainLayout>

            {/* Top Section */}
            <div className="relative h-[90vh] min-h-[200px] max-h-[530px] pt-24 py-3">
                {/* 3D World Animation Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                        {/* Sample 3D World Animation - Replace with your actual 3D asset */}
                        <div
                            className={`w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-transform duration-1000`}
                            style={{
                                backgroundImage: `url('/images/worldwid.jpg')`,
                                filter: 'brightness(0.8)'
                            }}
                        />

                        {/* Animated route lines overlay */}
                        <div className="absolute inset-0">
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/95 rounded-b-sm flex items-center">
                    <div className="container mx-auto px-4 text-white">
                        <div className="max-w-5xl pt-5 relative z-10">
                            <h1 className="text-3xl md:mt-3 lg:text-6xl font-bold leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                                    Track Your Shipment
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl max-w-xl leading-relaxed">
                                From humble beginnings to global logistics leader - delivering excellence since 2010
                                Join thousands of businesses who trust us with their supply chain needs
                            </p>
                            <div className="flex flex-col mt-5 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-[15rem]">
                                <Link href='/#' className="bg-blue-600 hover:bg-blue-700 px-4 py-4 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    Get a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute hidden border-gradient-to-b from-bg-white to-bg-gray-800 border-2 bg-white rounded-4xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-2xl px-4 z-30">
                    <h1 className="text-2xl text-black md:text-4xl py-5 text-center w-full font-bold" >
                        Your Shipments
                    </h1>
                </div>
            </div>


            <div className="bg-white py-16 text-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto items-center">
                        <div className="text-center mb-12">
                            <p className="text-lg text-gray-600">
                                Enter your tracking number to get real-time updates
                            </p>
                        </div>

                        <div className='mx-auto max-w-2xl'>
                            <TrackingInput
                                className="mb-12"
                                initialValue={sampleTrackingData.trackingNumber}
                            />
                        </div>

                        {sampleTrackingData.trackingNumber && (
                            <>
                                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div className="mb-4 md:mb-0">
                                            <h3 className="font-bold text-lg">{sampleTrackingData.trackingNumber}</h3>
                                            <p className="text-gray-600">
                                                {sampleTrackingData.origin} → {sampleTrackingData.destination}
                                            </p>
                                        </div>
                                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                                            {sampleTrackingData.status}
                                        </div>
                                    </div>
                                </div>

                                <TrackingStepper
                                    statusHistory={sampleTrackingData.history}
                                />
                            </>
                        )}

                        <TrackingHelp
                            faqs={faqs}
                            title='Tracking related Questions.'
                        />
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}
