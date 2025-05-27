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
        <div className={`${className}`}>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <label htmlFor="tracking-number" className="block text-sm font-medium text-gray-700 mb-1">
                    Track Your Shipment
                </label>
                <div className="flex shadow-sm rounded-md">
                    <input
                        type="text"
                        id="tracking-number"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`flex-1 min-w-0 block w-full px-4 py-3 rounded-l-md border ${
                            isFocused
                                ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50'
                                : 'border-gray-300'
                        } ${
                            trackingNumber && !isValid ? 'border-red-500' : ''
                        } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Enter your tracking number"
                        aria-describedby="tracking-number-helper"
                    />
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`inline-flex items-center px-4 py-3 border border-l-0 text-sm font-medium rounded-r-md ${
                            isValid
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        Track
                    </button>
                </div>
                {trackingNumber && !isValid && (
                    <p className="mt-2 text-sm text-red-600" id="tracking-number-error">
                        Please enter a valid tracking number
                    </p>
                )}
                <p className="mt-2 text-sm text-gray-500" id="tracking-number-helper">
                    Usually 10-30 characters long, found in your confirmation email
                </p>
            </form>
        </div>
    );
};

export default TrackingInput;
