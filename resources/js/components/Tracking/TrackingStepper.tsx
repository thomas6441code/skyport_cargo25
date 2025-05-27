import { Package, Plane, PackageCheck, PlaneTakeoff, PlaneLanding } from 'lucide-react';

export default function TrackingStepper({ statusHistory }) {
    const statusIcons = {
        'Picked Up': <PackageCheck />,
        'In Transit': <Plane />,
        'Departed': <PlaneTakeoff />,
        'Arrived': <PlaneLanding />,
        'Delivered': <PackageCheck />
    };

    return (
        <div className="py-8 mb-12">
            <div className="container mx-auto px-4">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="space-y-8">
                        {statusHistory.map((status, index) => (
                            <div
                                key={index}
                                className={`relative pl-12 ${index === 0 ? 'pt-2' : ''}`}
                            >
                                {/* Icon indicator */}
                                <div className={`absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full
                  ${status.active ? 'bg-blue-600 text-white animate-pulse' :
                                    status.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    {statusIcons[status.status] || <Package />}
                                </div>

                                {/* Content */}
                                <div className={`p-4 rounded-lg border ${status.active ? 'bg-blue-50 border-blue-100' : 'border-gray-200'}`}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold">{status.status}</h3>
                                        <span className="text-sm text-gray-500">{status.timestamp}</span>
                                    </div>
                                    <p className="text-gray-600 mt-1">{status.location}</p>
                                    {status.description && (
                                        <p className="text-sm text-gray-500 mt-2">{status.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
