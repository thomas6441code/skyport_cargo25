<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'slug' => 'air-freight',
                'title' => 'Air Freight',
                'image' => 'https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80',
                'description' => 'Rapid global air cargo solutions with real-time tracking and premium handling',
                'long_description' => 'Our air freight service provides the fastest international shipping solution for time-sensitive cargo. With partnerships with major airlines worldwide, we offer priority handling and dedicated cargo space to ensure your shipments arrive on schedule. We handle everything from perishable goods to high-value items with specialized temperature-controlled and secure containers.',
                'features' => [
                    '24-48hr delivery guarantee',
                    'End-to-end customs clearance',
                    'Dedicated cargo handlers',
                    'Temperature-controlled options',
                    'Real-time tracking system',
                    'Dangerous goods handling'
                ],
                'benefits' => [
                    'Fastest transit times for urgent shipments',
                    'Global coverage to all major airports',
                    'Specialized handling for sensitive cargo',
                    '24/7 shipment monitoring',
                    'Reduced risk of damage or loss',
                    'Competitive rates with major carriers'
                ],
                'process_steps' => [
                    'Collection and secure packaging at origin',
                    'Customs documentation preparation',
                    'Airway bill issuance and flight booking',
                    'Priority handling at airports',
                    'In-transit monitoring and updates',
                    'Final delivery with proof of receipt',
                    'Post-delivery support and documentation'
                ]
            ],
            [
                'slug' => 'export-services',
                'title' => 'Export Services',
                'image' => 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80',
                'description' => 'Comprehensive export management with secure warehousing and distribution',
                'long_description' => 'Our export services streamline your international trade operations with complete solutions including warehousing, documentation, and compliance management. We offer bonded storage facilities with advanced inventory systems to ensure your goods are ready for export with all necessary certifications and paperwork handled by our experts.',
                'features' => [
                    'Bonded storage facilities',
                    'Advanced inventory management',
                    'Pick & pack services',
                    'Quality assurance checks',
                    'Export documentation',
                    'Compliance management'
                ],
                'benefits' => [
                    'Reduced export lead times',
                    'Secure storage with 24/7 monitoring',
                    'Reduced overhead costs',
                    'Expert trade compliance guidance',
                    'Seamless integration with transport',
                    'Customized reporting'
                ],
                'process_steps' => [
                    'Goods receipt and inspection',
                    'Secure storage in bonded warehouse',
                    'Inventory management and reporting',
                    'Export documentation preparation',
                    'Customs compliance verification',
                    'Order fulfillment and packing',
                    'Final transport coordination'
                ]
            ],
            [
                'slug' => 'customs-clearance',
                'title' => 'Customs Clearance',
                'image' => 'https://images.unsplash.com/photo-1601050037636-1bd8df7aaced?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80',
                'description' => 'Streamlined customs processing with documentation experts',
                'long_description' => 'Our customs clearance service removes the complexity from international trade with licensed customs brokers who handle all documentation, tariff classifications, and duty optimization. We maintain relationships with customs authorities worldwide to ensure fast clearance and compliance with all regulations.',
                'features' => [
                    'Fast-track clearance',
                    'Document preparation',
                    'Regulatory compliance',
                    'Duty optimization',
                    'Tariff classification',
                    'Post-entry audits'
                ],
                'benefits' => [
                    'Faster clearance times',
                    'Reduced duty liabilities',
                    'Avoidance of penalties',
                    'Single point of contact',
                    'Up-to-date regulatory knowledge',
                    'Electronic submission'
                ],
                'process_steps' => [
                    'Document collection and review',
                    'HS code classification',
                    'Duty and tax calculation',
                    'Customs submission',
                    'Clearance coordination',
                    'Delivery authorization',
                    'Post-clearance documentation'
                ]
            ],
            [
                'slug' => 'outsourcing',
                'title' => 'Outsourcing',
                'image' => 'https://images.unsplash.com/photo-1581093450022-4b0ca5d35d4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900&q=80',
                'description' => 'End-to-end supply chain management solutions',
                'long_description' => 'Our outsourcing solutions provide complete supply chain management, allowing you to focus on your core business while we handle logistics operations. From procurement to final delivery, we offer customized solutions with full visibility and performance metrics to optimize your supply chain.',
                'features' => [
                    'Complete supply chain oversight',
                    'Cost reduction strategies',
                    '24/7 operational support',
                    'Performance tracking',
                    'Vendor management',
                    'Technology integration'
                ],
                'benefits' => [
                    'Reduced operational complexity',
                    'Improved cost efficiency',
                    'Access to logistics expertise',
                    'Scalable solutions',
                    'Real-time visibility',
                    'Continuous improvement'
                ],
                'process_steps' => [
                    'Needs assessment and planning',
                    'Process mapping and design',
                    'Implementation and integration',
                    'Ongoing management',
                    'Performance monitoring',
                    'Continuous optimization',
                    'Regular reporting and review'
                ]
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}