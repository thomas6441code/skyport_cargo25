<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="apple-mobile-web-app-title" content="SkyPortCargo" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta name="google-site-verification" content="Evl4N2applzV108cS3OfsJwDJjcDrfPiDTviayP7bTM" />

        <!-- Theme Color for Mobile Browsers -->
        <meta name="theme-color" content="#1a365d">

        <!-- Primary Meta Tags -->
        <meta name="description" content="@yield('description', 'Reliable air freight, ocean shipping, skyport cargo, skyportcargo, skyport, rail & road transport from China to Tanzania. Get competitive rates for your cargo shipments.')">
        <meta name="keywords" content="@yield('keywords', 'China to Tanzania shipping, skyport cargo, skyportcargo, skyport, air freight Tanzania, Logistics, Cargo, Export Services, SkyportCargo, skyportcargo.co.tz,  ocean shipping Africa, cargo logistics, international freight forwarding')">

        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}" />
        <title>@yield('title', 'SkyPort Cargo')</title>

        <!-- Favicons -->
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <!-- Preconnect and DNS-Prefetch -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://www.google-analytics.com">
        <link rel="preconnect" href="https://www.googletagmanager.com">

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        <!-- Fallback for JavaScript disabled -->
        <noscript>
            <style>
                [data-noscript] { display: block !important; }
                [data-noscript-hide] { display: none !important; }
            </style>
            <div class="p-4 bg-red-100 text-red-800" data-noscript>
                <strong>JavaScript is disabled:</strong> Some features may not work properly without JavaScript enabled.
            </div>
        </noscript>

    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- Loading indicator for SPA transitions -->
        <div id="loading-indicator" class="fixed inset-0 flex items-center justify-center bg-white/10 z-50 transition-opacity duration-500 ease-in-out">

            <div class="cssload-dots">
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
                <div class="cssload-dot"></div>
            </div>

            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12" ></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7" result="goo" ></feColorMatrix>
                    </filter>
                </defs>
            </svg>

        </div>

        <script>
            let loader = document.getElementById('loading-indicator');
            loader.style.opacity = '0';
            loader.style.display = 'none';

            document.addEventListener('inertia:start', () => {
                loader.style.display = 'flex';
                setTimeout(() => loader.style.opacity = '1', 10);
            });

            document.addEventListener('inertia:finish', () => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            });


        </script>

        <!-- Structured Data -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": ["LogisticsBusiness", "Organization", "SkyPort Cargo", "SkyPort"],
            "name": "SkyPort Cargo",
            "url": "https://skyportcargo.co.tz",
            "logo": "https://skyportcargo.co.tz/logo.svg",
            "description": "Professional logistics services between China and Tanzania",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tanzania",
                "addressLocality": "Dar es Salaam",
                "addressRegion": "Dar es Salaam",
                "postalCode": "Lumumba & Mafia Street",
                "addressCountry": "TZ"
            },
            "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
            "telephone": "+255794341226",
            "sameAs": [
                "https://facebook.com/skyportcargo",
                "https://linkedin.com/company/skyportcargo"
            ]
        }
        </script>

    </body>
</html>
