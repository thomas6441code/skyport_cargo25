import { ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { Link } from "@inertiajs/react";

export default function HeroWithVideo() {

    const videoRef = useRef<HTMLVideoElement>(null);
    const playbackRate = 0.5;

    useEffect(() => {
        if (videoRef.current) {
            try {
                videoRef.current.playbackRate = playbackRate;
                console.assert(
                    videoRef.current.playbackRate === playbackRate,
                    `Failed to set playback rate to ${playbackRate}`
                );
            } catch (error) {
                console.error('Error setting playback rate:', error);
            }
        }
    }, [playbackRate]);

    return (
        <div className="relative h-[97vh] min-h-[600px] overflow-hidden py-10 md:py-3">
            {/* 3D World Animation Container */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                    {/* Sample 3D World Animation - Replace with your actual 3D asset */}
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full opacity-20 object-cover"
                        style={{ filter: 'brightness(0.8)' }}
                    >
                        <source
                            src="/videosd/earth.mp4"
                            type="video/mp4"
                        />
                    </video>

                    {/* Animated route lines overlay */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>

                        {/* Animated route lines */}
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M25% 25% Q 50% 40%, 75% 33%"
                                stroke="rgba(96, 165, 250, 0.7)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5,5"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="100"
                                    to="0"
                                    dur="8s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <path
                                d="M15% 60% Q 40% 50%, 65% 70%"
                                stroke="rgba(248, 113, 113, 0.7)"
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray="5,5"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="100"
                                    to="0"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-center">
                <div className="container mx-auto px-4 text-white">
                    <div className="max-w-2xl relative md:ml-5 z-10">
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                                China-Tanzania
                            </span>
                            <br />
                            <span className="text-3xl lg:text-4xl" >
                                Air and Ocean Freight Specialists
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
                            Accelerate your supply chain with our premium air cargo solutions featuring real-time tracking and customs clearance.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-[15rem]">
                            <Link href='/get-quote' className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-lg font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>

                        <div className="mt-12 flex flex-wrap md:flex gap-4">
                            {['24-Hours of Work', 'Customs Cleared', 'Real-Time Tracking', 'Dedicated Support'].map((item, index) => (
                                <div key={index} className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 md:text-sm text-xs rounded-full mr-2 animate-pulse"></div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrolling indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
