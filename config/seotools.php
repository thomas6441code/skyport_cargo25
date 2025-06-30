<?php

return [
    'meta' => [
        'defaults'       => [
            'title'        => 'SkyPort Cargo - China to Tanzania Logistics Experts',
            'titleBefore'  => false,
            'description' => 'Reliable air freight, ocean shipping, rail & road transport from China to Tanzania. Competitive rates for cargo shipments.',
            'separator'    => ' - ',
            'keywords'     => [
                'China to Tanzania shipping', 
                'air freight Tanzania', 
                'ocean shipping Africa', 
                'cargo logistics', 
                'international freight forwarding',
                'Dar es Salaam port services',
                'Shanghai to Tanzania shipping',
                'rail freight China Africa',
                'road transport Tanzania',
                'customs clearance Tanzania'
            ],
            'canonical'    => 'full', // Set to 'current' or 'full'
            'robots'       => 'index, follow',
        ],
        'webmaster_tags' => [
            'google'    => null,
            'bing'      => null,
            'alexa'     => null,
            'pinterest' => null,
            'yandex'   => null,
            'norton'    => null,
        ],

        'add_notranslate_class' => false,
    ],

    'opengraph' => [
        'defaults' => [
            'title'       => 'SkyPort Cargo - China to Tanzania Logistics Experts',
            'description' => 'Professional logistics services between China and Tanzania including air freight, ocean shipping, rail and road transport',
            'url'         => null, // Set null for using current url
            'type'        => 'website',
            'site_name'   => 'SkyPort Cargo',
            'images'      => [
                'https://skyportcargo.co.tz/images/blogo.png'
            ],
            'locale'      => 'en_US',
            'locale:alternate' => ['sw_TZ', 'zh_CN'],
        ],
    ],

    'twitter' => [
        'defaults' => [
            'card'        => 'Summary_large_image',
            'site'        => '@skyportcargo',
            'creator'     => '@skyportcargo',
            'title'       => 'SkyPort Cargo - China-Tanzania Logistics',
            'description' => 'Reliable shipping solutions between China and Tanzania',
            'image'       => 'https://skyportcargo.co.tz/images/twitter-card.jpg',
        ],
    ],

    'json-ld' => [
        'defaults' => [
            'title'       => 'SkyPort Cargo - China to Tanzania Logistics Experts',
            'description' => 'Professional logistics services between China and Tanzania',
            'url'         => false, // Set to false or null to use current
            'type'        => 'WebPage',
            'images'      => ['https://skyportcargo.co.tz/images/blogo.png'],
            'sameAs'      => [
                'https://facebook.com/skyportcargo',
                'https://linkedin.com/company/skyportcargo',
                'https://twitter.com/skyportcargo'
            ],
            'organization' => [
                '@type' => 'Organization',
                'name'  => 'SkyPort Cargo',
                'logo'  => 'https://skyportcargo.co.tz/images/blogo.png',
                'address' => [
                    '@type' => 'PostalAddress',
                    'streetAddress' => 'Your Tanzania Address',
                    'addressLocality' => 'Dar es Salaam',
                    'addressRegion' => 'DSM',
                    'postalCode' => 'Lumumba Street',
                    'addressCountry' => 'TZ'
                ],
                'contactPoint' => [
                    '@type' => 'ContactPoint',
                    'telephone' => '+255746696695',
                    'contactType' => 'customer service',
                    'email' => 'info@skyportcargo.co.tz',
                    'areaServed' => ['TZ', 'CN'],
                    'availableLanguage' => ['English', 'Swahili', 'Chinese']
                ]
            ],
        ],
    ],

    'sitemap' => [
        'enabled' => true,
        'cache_key' => 'laravel.seotools.sitemap.',
        'cache_duration' => 3600,
    ],
];
