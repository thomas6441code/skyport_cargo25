export default function AppPromo() {
    return (
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">SKYPORT CARGO Mobile App</h2>
                        <p className="text-lg mb-6 max-w-md">
                            Track shipments, get quotes, and manage logistics on the go with our powerful mobile application.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <a href="#" className="block">
                                <img
                                    src="/images/app-store-badge.svg"
                                    alt="Download on the App Store"
                                    className="h-12"
                                />
                            </a>
                            <a href="#" className="block">
                                <img
                                    src="/images/play-store-badge.svg"
                                    alt="Get it on Google Play"
                                    className="h-12"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="md:w-1/2 relative flex justify-center">
                        <img
                            src="/images/app-screens.png"
                            alt="Mobile app screens"
                            className="h-64 md:h-80 object-contain relative z-10"
                        />
                        <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-white/10 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
