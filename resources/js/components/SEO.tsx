import { Helmet } from 'react-helmet';

interface SEOProps {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
    ogImage?: string;
    noIndex?: boolean;
    structuredData?: object;
}

const SEO = ({ 
    title, 
    description, 
    keywords, 
    canonical, 
    ogImage = '/images/blogo.png',
    noIndex = false,
    structuredData
}: SEOProps) => {
    const fullUrl = `https://skyportcargo.co.tz${canonical}`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://skyportcargo.co.tz${ogImage}`;
    
    // Default structured data for logistics company
    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "LogisticsBusiness",
        "name": "SkyPort Cargo",
        "url": "https://skyportcargo.co.tz",
        "logo": "https://skyportcargo.co.tz/images/blogo.png",
        "description": "Professional logistics services between China and Tanzania",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Tanzania",
            "addressLocality": "Dar es Salaam",
            "addressRegion": "DSM",
            "postalCode": "Lumumba Street",
            "addressCountry": "TZ"
        },
        "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
        "telephone": "+25574669665",
        "sameAs": [
            "https://facebook.com/skyportcargo",
            "https://linkedin.com/company/skyportcargo"
        ]
    };

    const mergedStructuredData = structuredData 
        ? { ...defaultStructuredData, ...structuredData } 
        : defaultStructuredData;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{`${title} | SkyPort Cargo - China to Tanzania Logistics`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(', ')} />
            <link rel="canonical" href={fullUrl} />
            
            {/* Robots */}
            {noIndex && <meta name="robots" content="noindex, nofollow" />}
            {!noIndex && <meta name="robots" content="index, follow" />}
            
            {/* OpenGraph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={`${title} | SkyPort Cargo`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:site_name" content="SkyPort Cargo" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="sw_TZ" />
            <meta property="og:locale:alternate" content="zh_CN" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@skyportcargo" />
            <meta name="twitter:creator" content="@skyportcargo" />
            <meta name="twitter:title" content={`${title} | SkyPort Cargo`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />
            
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(mergedStructuredData)}
            </script>
            
            {/* Favicon Links (recommended) */}
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Helmet>
    );
};

// Default props for common pages
SEO.defaultProps = {
    keywords: [
        'China to Tanzania shipping',
        'air freight Tanzania',
        'ocean shipping Africa',
        'cargo logistics',
        'international freight forwarding',
        'Dar es Salaam port services',
        'Shanghai to Tanzania shipping',
        'customs clearance Tanzania'
    ],
    ogImage: '/images/blogo.png'
};

export default SEO;
