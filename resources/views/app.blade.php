<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        
	<meta name="google-site-verification" content="Evl4N2applzV108cS3OfsJwDJjcDrfPiDTviayP7bTM" />

        <!-- Primary Meta Tags -->
        <title>@yield('title', 'SkyPort Cargo')</title>
        <meta name="description" content="@yield('description', 'Reliable air freight, ocean shipping, skyport cargo, skyportcargo, skyport, rail & road transport from China to Tanzania. Get competitive rates for your cargo shipments.')">
        <meta name="keywords" content="@yield('keywords', 'China to Tanzania shipping, skyport cargo, skyportcargo, skyport, air freight Tanzania, Logistics, Cargo, Export Services, SkyportCargo, skyportcargo.co.tz,  ocean shipping Africa, cargo logistics, international freight forwarding')">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}" />
        
        <!-- Theme Color for Mobile Browsers -->
        <meta name="theme-color" content="#1a365d">

        <!-- Favicons -->
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="SkyPortCargo" />
	<link rel="manifest" href="/site.webmanifest" />

        <!-- Preconnect and DNS-Prefetch -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://www.google-analytics.com">
        <link rel="preconnect" href="https://www.googletagmanager.com">

        <!-- Fonts -->
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <!-- Critical CSS -->
        <style>
            html {
                background-color: #ffffff;
                scroll-behavior: smooth;
            }
        </style>

        <!-- Structured Data -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": ["LogisticsBusiness", "Organization"],
            "name": "SkyPort Cargo",
            "url": "https://skyportcargo.co.tz",
            "logo": "https://skyportcargo.co.tz/logo.svg",
            "description": "Professional logistics services between China and Tanzania",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tanzania",
                "addressLocality": "Dar es Salaam",
                "addressRegion": "Dar es Salaam",
                "postalCode": "Lumumba Street",
                "addressCountry": "TZ"
            },
            "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
            "telephone": "+255746696695",
            "sameAs": [
                "https://facebook.com/skyportcargo",
                "https://linkedin.com/company/skyportcargo"
            ]
        }
        </script>

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
        <div id="loading-indicator" class="fixed top-0 left-0 w-full h-1 bg-sky-200 z-50" style="display: none;"></div>
        
        <script>
            // Simple loading indicator for SPA navigation
            document.addEventListener('inertia:start', () => {
                document.getElementById('loading-indicator').style.display = 'block';
            });
            document.addEventListener('inertia:finish', () => {
                document.getElementById('loading-indicator').style.display = 'none';
            });
        </script>
    </body>
</html>
