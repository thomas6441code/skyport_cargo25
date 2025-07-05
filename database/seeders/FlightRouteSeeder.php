<?php

namespace Database\Seeders;

use App\Models\FlightRoute;
use App\Models\RouteStop;
use Illuminate\Database\Seeder;

class FlightRouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $routes = [
            [
                'origin_city' => 'Shanghai',
                'origin_code' => 'PVG',
                'destination_city' => 'Dar es Salaam',
                'destination_code' => 'DAR',
                'duration' => '48',
                'active' => true,
                'departure_time' => '08:00',
                'arrival_time' => '20:00',
                'stops' => [],
            ],
            [
                'origin_city' => 'Guangzhou',
                'origin_code' => 'CAN',
                'destination_city' => 'Zanzibar',
                'destination_code' => 'ZNZ',
                'duration' => '52',
                'active' => true,
                'departure_time' => '10:30',
                'arrival_time' => '00:30',
                'stops' => [
                    [
                        'location' => 'Addis Ababa',
                        'code' => 'ADD',
                    ],
                ],
            ],
            [
                'origin_city' => 'Beijing',
                'origin_code' => 'PEK',
                'destination_city' => 'Kilimanjaro',
                'destination_code' => 'JRO',
                'duration' => '60',
                'active' => false,
                'departure_time' => '14:00',
                'arrival_time' => '05:00',
                'stops' => [],
            ],
            [
                'origin_city' => 'Shenzhen',
                'origin_code' => 'SZX',
                'destination_city' => 'Mwanza',
                'destination_code' => 'MWZ',
                'duration' => '72',
                'active' => true,
                'departure_time' => '16:45',
                'arrival_time' => '08:45',
                'stops' => [
                    [
                        'location' => 'Nairobi',
                        'code' => 'NBO',
                    ],
                    [
                        'location' => 'Kigali',
                        'code' => 'KGL',
                    ],
                ],
            ],
        ];

        foreach ($routes as $routeData) {
            // Create the flight route
            $route = FlightRoute::create([
                'origin_city' => $routeData['origin_city'],
                'origin_code' => $routeData['origin_code'],
                'destination_city' => $routeData['destination_city'],
                'destination_code' => $routeData['destination_code'],
                'duration' => $routeData['duration'],
                'active' => $routeData['active'],
                'departure_time' => $routeData['departure_time'],
                'arrival_time' => $routeData['arrival_time'],
            ]);

            // Create route stops if they exist
            foreach ($routeData['stops'] as $index => $stopData) {
                RouteStop::create([
                    'route_id' => $route->id,
                    'location' => $stopData['location'],
                    'code' => $stopData['code'],
                    'order' => $index,
                ]);
            }
        }

        $this->command->info('Successfully seeded flight routes with sample data!');
    }
}
