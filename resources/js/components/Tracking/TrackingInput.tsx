import { useState, useEffect } from 'react';

const TrackingInput = ({ className = '', initialValue = '' }) => {
    const [trackingNumber, setTrackingNumber] = useState(initialValue);
    const [isValid, setIsValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        // Basic validation - tracking numbers are typically alphanumeric and 10-30 characters
        const valid = /^[A-Za-z0-9]{10,30}$/.test(trackingNumber);
        setIsValid(valid);
    }, [trackingNumber]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            // Handle tracking submission
            console.log('Tracking number submitted:', trackingNumber);
            // You would typically call an API or parent component function here
        }
    };

    return (
        <div className={`${className} w-full`}>
            <div className={`md:w-full w-[23.5rem] px-3`}>

                <form
                    onSubmit={handleSubmit}
                    className={`bg-white rounded-4xl shadow-2xl p-2  transition-all  duration-300 ${isFocused ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
                        }`}
                >

                    <div className="flex items-stretch">
                        <div className="flex-grow flex items-center md:px-3 px-2 py-1 bg-gray-50 rounded-l-4xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="md:h-6 h-5 md:w-6 w-5 text-gray-400 md:mr-3 mr-1"
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
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Enter tracking number (e.g. CNTZ123456789)"
                                className="flex-grow bg-transparent outline-none text-gray-800 placeholder-gray-400 rounded-l-lg md:text-lg  md:py-4 py-2"
                            />
                        </div>
                        <div className="bg-gray-50 flex items-center justify-center rounded-r-4xl">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white md:px-4 px-3 py-2 md:py-3 rounded-4xl font-medium transition-all duration-300 flex items-center"
                            >
                                <span className="hidden md:flex">Track</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="md:h-5 h-4 w-4 md:w-5 ml-2"
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
                {trackingNumber && !isValid && (
                    <p className="mt-2 text-sm text-red-600" id="tracking-number-error">
                        Please enter a valid tracking number
                    </p>
                )}
                <p className="mt-3 text-sm text-gray-500" id="tracking-number-helper">
                    Usually 10-30 characters long, found in your confirmation email
                </p>
            </div>
        </div>
    );
};

export default TrackingInput;
