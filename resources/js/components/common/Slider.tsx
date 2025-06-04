import React, { useState, useEffect } from 'react';


interface Slide {
    id: number;
    title: string;
    slide_url: string;
}


const ImageSlider = ({ images }: { images: Slide[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsZooming(true);
            setTimeout(() => {
                setIsZooming(false);
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToSlide = (index: number) => {
        setIsZooming(true);
        setTimeout(() => {
            setIsZooming(false);
            setCurrentIndex(index);
        }, 100);
    };

    const handleTrackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Tracking number submitted:', trackingNumber);
    };

    return (
        <div className="relative w-full h-[50vh] md:min-h-[615px] shadow-2xl z-30">
            {/* Slides container */}
            <div className="relative w-full h-full overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div
                            className={`w-full h-full bg-cover bg-center transition-transform duration-1000 ${isZooming && index === currentIndex ? 'scale-110' : 'scale-100'
                                }`}
                            style={{
                                backgroundImage: `url(${image?.slide_url})`,
                                transitionTimingFunction: index === currentIndex ?
                                    (isZooming ? 'ease-out' : 'ease-in') : 'linear'
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Bottom Tracking Input - New Design */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-3xl px-4 z-30">
                <form
                    onSubmit={handleTrackSubmit}
                    className={`bg-white rounded-4xl shadow-2xl p-2 transition-all  duration-300 ${isInputFocused ? 'ring-2 ring-indigo-500' : ''
                        }`}
                >
                    <div className="flex items-stretch z-30">
                        <div className="flex-grow flex items-center px-5 py-1 bg-gray-50 rounded-l-4xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-400 mr-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                            <input
                                type="text"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                placeholder="Enter tracking number (e.g. CNTZ123456789)"
                                className="flex-grow bg-transparent outline-none text-gray-800 placeholder-gray-400 rounded-l-lg md:text-lg  py-4"
                            />
                        </div>
                        <div className="bg-gray-50 flex items-center justify-center rounded-r-4xl">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-4 rounded-4xl font-medium transition-all duration-300 flex items-center"
                            >
                                <span className="hidden md:flex">Track</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
                <p className="text-white text-center mt-3 md:text-sm text-xs drop-shadow-lg">
                    Enter your 12-digit tracking number to check shipment status
                </p>
            </div>

            {/* Slide indicator */}
            <div className="absolute bottom-28 left-0 right-0">
                <div className="flex justify-center space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex
                                ? 'bg-white w-6 shadow-lg'
                                : 'bg-white/50 w-3 hover:bg-white/70'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
