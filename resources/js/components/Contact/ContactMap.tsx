import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { DivIcon } from 'leaflet';
import React, { ReactNode } from 'react';

// Type definitions

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

interface ContactMapProps {
    offices?: offices[];
    className?: string;
    showRoute?: boolean;
    mapStyle?: React.CSSProperties;
}

// Custom icon creation with TypeScript
const createCustomIcon = (iconColor: string = '#0056b3'): DivIcon => {
    return L.divIcon({
        html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${iconColor}" width="32" height="32">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

const ContactMap: React.FC<ContactMapProps> = ({
    offices = [],
    className = '',
    showRoute = true,
    mapStyle = { height: '500px', width: '100%' }
}) => {
    // Default offices if none provided
    const defaultOffices: offices[] = [
        {
            id: 1,
            coordinates: [31.2304, 121.4737], // Shanghai
            country: 'China',
            city: 'Shanghai',
            address: '123 Cargo Avenue, Pudong District',
            color: '#0056b3'
        },
        {
            id: 2,
            coordinates: [-6.7924, 39.2083], // Dar es Salaam
            country: 'Tanzania',
            city: 'Dar es Salaam',
            address: '456 Logistics Street, Kivukoni',
            color: '#e31937'
        }
    ];

    const displayOffices = offices.length > 0 ? offices : defaultOffices;

    // Create route between offices if more than one exists
    const routeCoordinates = displayOffices.length > 1
        ? displayOffices.map(office => office.coordinates)
        : [];

    const openGoogleMaps = (coords: [number, number]): void => {
        window.open(`https://maps.google.com?q=${coords.join(',')}`);
    };

    const renderPopupContent = (office: offices): ReactNode => (
        <div className="min-w-[200px] space-y-2">
            <h3 className="font-bold text-lg">{office.city}</h3>
            <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{office.country}</span>
            </div>
            {office.address && (
                <p className="text-sm text-gray-500 flex items-start">
                    <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {office.address}
                </p>
            )}
            {office.phone && (
                <a href={`tel:${office.phone}`} className="block text-sm text-primary hover:underline flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {office.phone}
                </a>
            )}
        </div>
    );

    return (
        <div className={`${className} rounded-xl overflow-hidden shadow-lg relative`}>
            <MapContainer
                center={[20, 80]}
                zoom={3}
                style={mapStyle}
                scrollWheelZoom={true}
                doubleClickZoom={true}
            >
                {/* Light-themed base map */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Show route between offices if enabled */}
                {showRoute && routeCoordinates.length > 1 && (
                    <Polyline
                        positions={routeCoordinates}
                        color="#0056b3"
                        weight={2}
                        dashArray="5, 5"
                        className="animate-dash"
                    />
                )}

                {/* Office markers */}
                {displayOffices.map((office) => (
                    <Marker
                        key={office.id}
                        position={office.coordinates}
                        icon={createCustomIcon(office.color)}
                    >
                        <Popup className="custom-popup">
                            {renderPopupContent(office)}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Map controls overlay */}
            <div className="absolute top-4 right-4 z-[1000] space-y-2">
                <button
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    onClick={() => openGoogleMaps(displayOffices[0].coordinates)}
                    aria-label="Open in Google Maps"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ContactMap;
