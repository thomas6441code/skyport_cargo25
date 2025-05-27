<?php

namespace Database\Seeders;

use App\Models\Tracking;
use App\Models\TrackingStatus;
use Illuminate\Database\Seeder;

class TrackingStatusesSeeder extends Seeder
{
    public function run()
    {
        // Only seed if we have tracking records
        if (Tracking::count() > 0) {
            $statuses = [
                [
                    'status' => 'Shipment Received',
                    'description' => 'Package received at origin facility'
                ],
                [
                    'status' => 'Processing',
                    'description' => 'Documentation verification in progress'
                ],
                [
                    'status' => 'Departed Origin',
                    'description' => 'Left origin facility'
                ],
                [
                    'status' => 'In Transit',
                    'description' => 'On route to destination'
                ],
                [
                    'status' => 'Arrived at Destination',
                    'description' => 'Received at destination facility'
                ],
                [
                    'status' => 'Out for Delivery',
                    'description' => 'On final delivery vehicle'
                ],
                [
                    'status' => 'Delivered',
                    'description' => 'Successfully delivered'
                ]
            ];

            Tracking::all()->each(function ($tracking) use ($statuses) {
                $timestamp = now()->subDays(rand(1, 3));

                foreach ($statuses as $status) {
                    if ($status['status'] === 'Delivered' && rand(0, 3) !== 1) {
                        continue; // Only mark some as delivered
                    }

                    TrackingStatus::create([
                        'tracking_id' => $tracking->id,
                        'status' => $status['status'],
                        'location' => $this->getLocation($status['status'], $tracking),
                        'description' => $status['description'],
                        'occurred_at' => $timestamp,
                        'created_at' => $timestamp,
                        'updated_at' => $timestamp
                    ]);

                    $timestamp = $timestamp->addHours(rand(2, 12));

                    // Update tracking current status
                    $tracking->update([
                        'current_status' => $status['status'],
                        'estimated_arrival' => $status['status'] === 'Delivered'
                            ? $timestamp
                            : $timestamp->addDays(rand(1, 3))
                    ]);

                    if ($status['status'] === 'Delivered') break;
                }
            });
        }
    }

    protected function getLocation($status, $tracking)
    {
        if ($status === 'Shipment Received' || $status === 'Processing') {
            return $tracking->origin;
        }

        if ($status === 'Delivered' || $status === 'Out for Delivery') {
            return $tracking->destination;
        }

        $cities = [
            'Shanghai', 'Guangzhou', 'Nairobi', 'Mombasa', 'Zanzibar'
        ];

        return $cities[array_rand($cities)];
    }
}
