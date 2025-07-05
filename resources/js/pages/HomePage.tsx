import HeroWithVideos from '@/components/Home/HeroWithVideos';
import ServiceCards from '@/components/common/ServiceCards';
import { StatsBanner } from "@/components/common/StatsBanner";
import TestimonialSection from "@/components/common/Testimonials";
import MainLayout from "@/layouts/MainLayout";
import ImageSlider from "@/components/common/Slider";
import { Check, GlobeIcon, GoalIcon, ShieldBanIcon } from 'lucide-react';
import TrackingHelp from '@/components/Tracking/TrackingHelp';

interface Slide {
    id: number;
    title: string;
    slide_url: string;
}

interface Testimonial {
    'id': number;
    'name': string;
    'role': string;
    'content': string;
    'rating': number;
    'image': string;
}

interface Faqs {
    'id': number;
    'question': string;
    'answer': string;
    'category': string;
}

interface Stats {
    value: string;
    label: string;
    icon: string;
}

interface Service {
    slug: string;
    image: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    link: string;
    long_Description?: string;
    benefits?: string[];
    process_Steps?: string[];
}

interface CompanyData {
    id?: number;
    vision: string;
    mission: string;
    core_values: string[];
}

interface RouteStop {
  id?: number;
  location: string;
  code: string;
  order?: number;
}

interface FlightRoute {
  id?: number;
  origin_city: string;
  origin_code: string;
  destination_city: string;
  destination_code: string;
  duration: string;
  active: boolean;
  departure_time: string;
  arrival_time: string;
  stops: RouteStop[];
  created_at?: string;
  updated_at?: string;
}

interface Props {
    faqs: Faqs[];
    stats: Stats[];
    companydata: CompanyData; 
    slides: Slide[];
    routes: FlightRoute[]; 
    services: Service[];
    testimonials: Testimonial[];
}

export default function HomePage({ companydata, routes, testimonials, slides, faqs, stats, services }: Props) {

    return (
        <MainLayout>
            <ImageSlider images={slides} />

            <StatsBanner stats={stats} />


             <div className="bg-white text-center py-14 z-30 md:px-6">
                <div className="text-center mb-14">
                    <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-medium uppercase tracking-wider mb-3">
                        Our Philosophy
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Precision in Motion
                    </h2>
                    <div className="relative max-w-2xl mx-auto">
                        <p className="text-gray-600 leading-relaxed">
		          Redefining global logistics with intelligent technology, precision execution,
			 and sustainable innovation - moving businesses forward while bringing the world closer together.                            
                       </p>
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-sky-500"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 mx-auto container">
                    {/* Vision Card */}
                    <div className="py-10 grid grid-cols-1 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="bg-sky-100 p-2 rounded-lg mr-3">
                                    <GlobeIcon className="w-6 h-6 text-sky-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="text-gray-600 text-left text-sm leading-relaxed">
				{companydata.vision}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="bg-sky-100 p-2 rounded-lg mr-3">
                                    <GoalIcon className="w-6 h-6 text-sky-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Our Goal</h3>
                            </div>
                            <p className="text-gray-600 text-sm text-left leading-relaxed">
				{companydata.mission}
                            </p>
                        </div>
                    </div>

                    {/* Values Card */}
                    <div className="bg-white md:m-10 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center mb-4">
                            <div className="bg-sky-100 p-2 rounded-lg mr-3">
                                <ShieldBanIcon className="w-6 h-6 text-sky-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Our Values</h3>
                        </div>
                        <ul className="space-y-3">
                            {companydata?.core_values?.map((value, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="mt-1 mr-2 flex-shrink-0">
                                        <Check className="w-4 h-4 text-sky-500" />
                                    </div>
                                    <span className="text-gray-600 text-sm text-left">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* <Pricing /> */}

            <HeroWithVideos routes={routes} />

            <ServiceCards services={services} />

            <section className="py-16 bg-gray-50 z-30">
                <TestimonialSection testimonials={testimonials} />

                <div className="mx-auto pt-10 md:max-w-[80vw] w-[100vw] px-3">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Mostly Asked Question</h2>
                        <div className="w-16 h-1 bg-sky-500 mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Choose the perfect logistics solution for your business needs, We are here to answer you.
                        </p>
                    </div>
                    <TrackingHelp title="Overall Asked Questions" faqs={faqs} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-skyblue text-white z-30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Ship With Us?</h2>
                    <p className="text-sky-100 max-w-2xl mx-auto mb-8">
                        Get started with our logistics solutions today and experience seamless global shipping
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-white text-sky-700 rounded-lg font-medium hover:bg-gray-100 transition shadow-md"
                    >
                        Contact Us
                    </a>
                </div>
            </section>

        </MainLayout>
    );
}
