import { Package, Search } from 'lucide-react';

export default function ParcelTracker() {
return (
<div className="bg-black text-gray-50 py-3">
    <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
                <Package className="h-5 w-5 mr-2" />
                <span className="font-medium">TRACK YOUR SHIPMENT</span>
            </div>

            <div className="relative text-gray-50 w-full md:w-auto md:flex-1 md:max-w-xl md:mx-8">
                <input
                    type="text"
                    placeholder="Enter tracking number"
                    className="w-full py-3 px-4 pr-12 rounded-lg text-gray-50 border-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary-dark text-gray-50 p-2 rounded-md">
                    <Search className="h-5 w-5" />
                </button>
            </div>

            <div className="hidden md:block">
                <button className="text-white hover:underline text-sm">
                    Multiple Tracking
                </button>
            </div>
        </div>
    </div>
</div>
);
}
