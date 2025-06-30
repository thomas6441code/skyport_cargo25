import ContactForm from "@/components/Contact/ContactForm";
import MainLayout from "@/layouts/MainLayout";
import ContactOffices from "@/components/Contact/ContactOffices";
import ContactMap from "@/components/Contact/ContactMap";

interface offices {
    id: number;
    coordinates: [number, number];
    country: string;
    city: string;
    address?: string;
    email?: string;
    phone?: string;
    hours?: string;
    color?: string;
}

interface departments {
    'id': number;
    'name': string;
    'description': string;
}

interface Image {
    id: number;
    title: string;
    slide_url: string;
}

interface OfficeProps {
    image: Image;
    offices?: offices[];
    departments?: departments[];
}


const ContactPage: React.FC<OfficeProps> = ({ offices, departments, image }) => {

    return (
        <MainLayout>

            <div className="bg-white text-gray-800">

                {/* Top Section */}
                <div className="relative h-[90vh] md:min-h-[600px] max-h-[630px] pb-10 z-30">
                    3D World Animation Container
                    <div
                        className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
                        <div className="relative w-full h-full">
                            Sample 3D World Animation - Replace with your actual 3D asset
                            <div
                                className={`w-full h-full bg-cover object-cover inset-0 absolute bg-center transition-transform duration-1000`}
                                style={{
                                    backgroundImage: `url('/images/slides/${image?.slide_url}')`,
                                    filter: 'brightness(0.8)'
                                }}
                            />

                            Animated route lines overlay
                            <div className="absolute inset-0">
                                <div
                                    className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <div
                                    className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                <div
                                    className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/*  Content Overlay */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/95 flex items-center">
                        <div className="container mx-auto px-4 text-white">
                            <div className="max-w-5xl relative z-10">
                                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                    <span
                                        className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                                        Contact Us
                                    </span>
                                    <br />
                                    <span className="text-xl md:text-2xl max-w-xl leading-relaxed">
                                        Get in touch with our logistics experts for your
                                        China-Tanzania shipping needs.
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl max-w-xl leading-relaxed">
                                    From humble beginnings to global logistics leader - delivering excellence since 2010
                                    Join thousands of businesses who trust us with their supply chain needs.
                                </p>

                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute hidden md:flex -l shadow-2xl bg-white rounded-4xl bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-lg px-2 z-30">
                        <h2 className="text-2xl text-black md:text-4xl py-5 text-center w-full font-bold">
                            Get in Touch with Us
                        </h2>
                    </div>
                </div>

                <div className="container mx-auto mt-8 md:mt-24 px-4 z-10">

                    <div className="flex flex-col lg:flex-row gap-12 mb-16">
                        <div className="lg:w-1/2">
                            <ContactForm
                                departments={departments}
                            />
                        </div>

                        <div className="lg:w-1/2 gap-3 z-0">
                            <ContactOffices
                                offices={offices}
                            />

                            <div className="container mx-auto h-96 mt-5 overflow-hidden">
                                <ContactMap
                                    offices={offices}
                                    className="border border-gray-200"
                                    showRoute={true}
                                    mapStyle={{ height: '600px', width: '100%' }}
                                />
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </MainLayout>
    );
}

export default ContactPage;
