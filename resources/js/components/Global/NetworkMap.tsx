import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/markers/marker-icon-2x.png',
    iconUrl: '/images/markers/marker-icon.png',
    shadowUrl: '/images/markers/marker-shadow.png',
});

export default function NetworkMap() {
    const chinaIcon = new L.Icon({
        iconUrl: '/images/markers/china-marker.png',
        iconSize: [32, 32],
    });

    const tanzaniaIcon = new L.Icon({
        iconUrl: '/images/markers/tanzania-marker.png',
        iconSize: [32, 32],
    });

    const routes = [
        {
            from: [31.2304, 121.4737], // Shanghai
            to: [-6.7924, 39.2083],    // Dar es Salaam
            color: '#e31937',
            label: 'Primary Air Route'
        },
        {
            from: [23.3924, 113.2988], // Guangzhou
            to: [-6.7924, 39.2083],    // Dar es Salaam
            color: '#0056b3',
            label: 'Secondary Route'
        }
    ];

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Global Network</h2>
                <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
                    <MapContainer
                        center={[20, 80]}
                        zoom={3}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <Marker position={[31.2304, 121.4737]} icon={chinaIcon}>
                            <Popup>
                                <h3 className="font-bold">Shanghai Hub</h3>
                                <p>Main operations center in China</p>
                            </Popup>
                        </Marker>

                        <Marker position={[-6.7924, 39.2083]} icon={tanzaniaIcon}>
                            <Popup>
                                <h3 className="font-bold">Dar es Salaam Office</h3>
                                <p>Tanzania distribution center</p>
                            </Popup>
                        </Marker>

                        {routes.map((route, idx) => (
                            <Polyline
                                key={idx}
                                positions={[route.from, route.to]}
                                color={route.color}
                                weight={2}
                                dashArray={idx === 0 ? null : "5, 5"}
                            />
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
