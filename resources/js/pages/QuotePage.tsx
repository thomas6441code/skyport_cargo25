import MainLayout from "@/layouts/MainLayout";
import { QuoteForm } from "@/components/Quotes/QuoteForm";
import { QuoteProcess } from "@/components/Quotes/QuoteProcess";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

interface cargotype {
    id: number;
    name: string;
    description: string;
}


interface cargoTypeProps {
    cargoTypes: cargotype[],
}

export default function QuotePage({ cargoTypes }: cargoTypeProps) {

    console.log(cargoTypes)
    return (
        <MainLayout>
            {/* Top Section */}
            <div className="relative h-[90vh] min-h-[200px] max-h-[530px] rounded-b-sm pt-24 py-3">
                {/* 3D World Animation Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-sm flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <div
                            className={`w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-transform duration-1000`}
                            style={{
                                backgroundImage: `url('/images/3d-hnology.jpg')`,
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/95 rounded-b-sm flex items-center">
                    <div className="container mx-auto px-4 text-white">
                        <div className="max-w-5xl pt-5 relative z-10">
                            <h1 className="text-3xl md:mt-3 lg:text-6xl font-bold leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                                    Get Quote
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

                <div className="absolute hidden md:flex border-gradient-to-l from-bg-sky-300 to-bg-gray-800 border-2 bg-white rounded-4xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-3xl px-4 z-30">
                    <h1 className="text-2xl text-black md:text-4xl py-5 text-center w-full font-bold" >
                        Get a Freight Quote
                    </h1>
                </div>
            </div>

            <div className="bg-gray-50 py-16 pt-16 text-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <p className="text-lg text-gray-600">
                                Complete the form below for competitive rates on China-Tanzania shipments
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10">
                            <div className="lg:w-2/3 md:px-10">
                                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="p-8">
                                        <QuoteForm
                                            defaultOrigin="Shanghai, China"
                                            defaultDestination="Dar es Salaam, Tanzania"
                                            cargoTypes={cargoTypes}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-1/3">
                                <div className="bg-white rounded-xl shadow-md overflow-hidden p-2 sticky top-40">
                                    <QuoteProcess
                                        steps={[
                                            'Fill out the quote form',
                                            'Receive rates within 2 hours',
                                            'Confirm and book shipment',
                                            'We handle the rest!'
                                        ]}
                                    />
                                    <div className="m-3 bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-bold text-blue-800 mb-2">Need Help?</h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Our logistics experts are available 24/7 to assist with your quote.
                                        </p>
                                        <a
                                            href="tel:+255774419171"
                                            className="text-blue-600 font-medium text-sm hover:underline"
                                        >
                                            +255 77 441 7191
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
