import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import React from "react";

interface Office {
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

interface  ContactOfficeProps{
    offices?: Office[];
}

const ContactOffices: React.FC<ContactOfficeProps> = ({ offices = [] })=> {
    // Default offices if none provided
    const defaultOffices: Office[ ] = [
        {
            id: 1,
            coordinates: [31.2304, 121.4737] as [number, number],
            country: 'China',
            city: 'Shanghai',
            address: '123 Cargo Avenue',
            email: 'info@skyport.com',
            phone: '+86 21 1234 5678',
            hours: 'Mon-Fri: 8:00AM - 6:00PM',
            color: '#0056b3'
        },
        {
            id: 2,
            coordinates: [-6.7924, 39.2083] as [number, number],
            country: 'Tanzania',
            email: 'info@skyport.com',
            city: 'Dar es Salaam',
            address: 'Lumumba Street, M/Mmoja',
            phone: '+255 76 441 9171',
            hours: 'Mon-Fri: 9:00AM - 5:00PM',
            color: '#e31937'
        }
    ];


    const displayOffices = offices.length > 0 ? offices : defaultOffices;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Our Offices</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayOffices.map((office) => (
                    <div key={office.id} className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold mb-4">
                            <span className="text-gray-600">{office.country}</span> • {office.city}
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                                <p>{office.address}</p>
                            </div>

                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                                <a href={`tel:${office.phone}`} className="hover:text-primary">{office.phone}</a>
                            </div>

                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                                <a href={`mailto:${office.email}`} className="hover:text-primary">{office.email}</a>
                            </div>

                            <div className="flex items-center">
                                <Clock className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                                <p>{office.hours}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactOffices;
