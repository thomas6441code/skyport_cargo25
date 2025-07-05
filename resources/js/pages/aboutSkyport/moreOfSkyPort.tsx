import { Head } from '@inertiajs/react';
import React from 'react';
import { Copyright, Globe, Heart, Mail, Shield, FileText } from 'lucide-react';

export default function Services() {
    const currentYear = new Date().getFullYear();

    const services = [
        {
            title: "Air Cargo Services",
            icon: "paper-airplane",
            description: "Comprehensive scheduled and charter flight solutions for all cargo categories",
            features: [
                "Daily scheduled flights to major global hubs",
                "Charter options for urgent/oversized shipments",
                "Consolidation services for cost efficiency",
                "Priority handling at all partner airports"
            ],
            types: [
                { name: "General Cargo", details: "Standard air freight for non-specialized goods" },
                { name: "Express Cargo", details: "Guaranteed next-flight-out services with 24/7 operations" }
            ]
        },
        {
            title: "Temperature-Controlled Perishables",
            icon: "snowflake",
            description: "End-to-end cold chain solutions for time-sensitive perishable goods",
            features: [
                "Active temperature monitoring (+4°C to -25°C range)",
                "Ventilated containers for live products",
                "Ethylene-controlled environments for flowers/fruits",
                "Pharma-certified handling (IATA CEIV)"
            ],
            types: [
                { name: "Food Products", details: "Meat, seafood, dairy, fruits & vegetables" },
                { name: "Pharmaceuticals", details: "Vaccines, biologics, clinical trial materials" },
                { name: "Floral", details: "Cut flowers, live plants with hydration systems" }
            ]
        },
        {
            title: "Dangerous Goods & Special Cargo",
            icon: "shield-check",
            description: "Certified handling for all hazard classes with complete compliance",
            features: [
                "IATA DGR certified staff",
                "Class-specific packaging (UN-certified)",
                "Explosive items handling (Class 1)",
                "Radioactive materials (Class 7) protocols"
            ],
            types: [
                { name: "Explosives", details: "Mining/construction materials with blast-proof containers" },
                { name: "Chemicals", details: "Flammable liquids/solids with secondary containment" },
                { name: "Batteries", details: "Lithium-ion/PI966/967 compliant packaging" }
            ]
        },
        {
            title: "Export Management",
            icon: "truck",
            description: "Complete export solutions from pickup to final delivery",
            features: [
                "FCL (Full Container Load) air container solutions",
                "Bulk cargo handling for loose commodities",
                "Pre-shipment quality inspections",
                "Export documentation preparation"
            ],
            types: [
                { name: "FCL Services", details: "Dedicated ULDs for single shippers" },
                { name: "Bulk Cargo", details: "Grain, minerals in specialized bulk loaders" }
            ]
        },
        {
            title: "Procurement & Logistics",
            icon: "clipboard-check",
            description: "Integrated sourcing and supply chain management",
            features: [
                "Supplier identification & vetting",
                "Purchase order management",
                "Quality control inspections (AQL 2.5 standard)",
                "Consolidation warehousing"
            ],
            types: [
                { name: "Purchasing", details: "Raw materials, components from global suppliers" },
                { name: "Outsourcing", details: "Complete procurement process management" }
            ]
        },
        {
            title: "Customs & Compliance",
            icon: "document-text",
            description: "Streamlined regulatory clearance worldwide",
            features: [
                "Pre-clearance arrangements",
                "Duty optimization strategies",
                "Electronic declarations (EDI)",
                "Bonded warehousing"
            ],
            types: [
                { name: "Customs Clearance", details: "Tanzania TRA, FDA, TBS compliance" },
                { name: "Documentation", details: "Commercial invoices, certificates of origin" }
            ]
        }
    ];

    return (
        <div className="min-h-screen md:px-0 px-2 bg-gray-50">
            <Head title="Specialized Air Cargo Services | SkyPort Cargo" />

            {/* Logo & Brand Header */}
            <div className="bg-white py-8 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <img
                        src="/flogo.svg"
                        alt="SkyPort Cargo Logo"
                        className="h-24 w-auto mb-6"
                    />
                    <h1 className="text-4xl font-extrabold text-indigo-900 text-center">
                        SKYPORT CARGO
                    </h1>
                    <p className="mt-2 text-xl text-indigo-600">
                        Excellence in Global Air Logistics
                    </p>
                </div>
            </div>

            {/* Company Introduction */}
            <div className="py-16 bg-indigo-50">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Who We Are
                        </h2>
                        <div className="mt-6 space-y-6 text-lg text-gray-700 text-left">
                            <p>
                                SkyPort Cargo is a premier air freight(cargo) logistics provider headquartered in Dar es Salaam, Tanzania, with operational hubs across East Africa and strategic partnerships worldwide. Since our founding in 2023, we've specialized in time-sensitive, high-value, and specialized cargo transportation.
                            </p>
                            <p>
                                Our core mission is to bridge global markets with seamless air logistics solutions, combining local expertise with international standards. We serve diverse industries including pharmaceuticals, perishables, mining, manufacturing, and e-commerce.
                            </p>
                            <p className="font-medium text-indigo-700">
                                What sets us apart is our commitment to precision handling, real-time cargo monitoring, and customized logistics solutions tailored to each client's unique supply chain requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <div key={`service-${index}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="bg-indigo-600 p-6">
                                <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
                                    <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                                            service.icon === "paper-airplane" ? "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" :
                                                service.icon === "snowflake" ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" :
                                                    service.icon === "shield-check" ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" :
                                                        service.icon === "truck" ? "M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM12 16v-5m0 0l-3-3m3 3l3-3" :
                                                            service.icon === "clipboard-check" ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" :
                                                                "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        } />
                                    </svg>
                                </div>
                                <h2 className="mt-4 text-xl font-bold text-white">{service.title}</h2>
                                <p className="mt-2 text-indigo-100">{service.description}</p>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Key Features</h3>
                                <ul className="mt-4 space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={`feature-${index}-${i}`} className="flex items-start">
                                            <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="ml-2 text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <h3 className="mt-6 text-lg font-medium text-gray-900 border-b pb-2">Service Types</h3>
                                <div className="mt-4 space-y-4">
                                    {service.types.map((type, j) => (
                                        <div key={`type-${index}-${j}`} className="bg-gray-50 p-3 rounded-lg">
                                            <h4 className="font-medium text-indigo-600">{type.name}</h4>
                                            <p className="mt-1 text-sm text-gray-500">{type.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Process Section */}
            <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">Our Operational Workflow</h2>
                    <div className="mt-12 space-y-10">
                        {[
                            {
                                step: "1. Cargo Assessment",
                                details: "Our logistics engineers conduct a thorough evaluation of your shipment's dimensions, weight, fragility, and regulatory requirements to determine optimal transport solutions.",
                                subpoints: [
                                    "Pre-shipment inspection report",
                                    "Packaging recommendations",
                                    "Route optimization analysis"
                                ]
                            },
                            {
                                step: "2. Documentation & Compliance",
                                details: "Complete preparation of all necessary paperwork including air waybills, commercial invoices, and specialized permits.",
                                subpoints: [
                                    "Dangerous Goods Declaration (DGD)",
                                    "Phytosanitary certificates",
                                    "Export/Import licenses"
                                ]
                            },
                            {
                                step: "3. Specialized Handling",
                                details: "Certified teams implement appropriate protocols based on cargo type with real-time monitoring.",
                                subpoints: [
                                    "Temperature-controlled ULD preparation",
                                    "Explosive-safe handling areas",
                                    "Chain of custody documentation"
                                ]
                            },
                            {
                                step: "4. Customs Clearance",
                                details: "Pre-arrival processing with regulatory authorities to ensure immediate release upon landing.",
                                subpoints: [
                                    "Pre-cleared shipments",
                                    "Duty payment facilitation",
                                    "Bonded transfer coordination"
                                ]
                            }
                        ].map((stage, index) => (
                            <div key={`stage-${index}`} className="relative pl-16">
                                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{stage.step}</h3>
                                <p className="mt-2 text-gray-600">{stage.details}</p>
                                <ul className="mt-4 space-y-2 pl-2">
                                    {stage.subpoints.map((point, i) => (
                                        <li key={`point-${index}-${i}`} className="flex items-start">
                                            <svg className="h-5 w-5 text-indigo-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                            </svg>
                                            <span className="ml-2 text-gray-500">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

	{/* Quality Assurance Section */}
	<div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden group">
	  
	  {/* Header with animated icon */}
	  <div className="relative z-10 p-6">
	    <div className="flex items-start">
	      <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-lg bg-indigo-600 text-white">
	        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
	        </svg>
	      </div>
	      <div className="ml-5">
	        <h3 className="text-2xl font-bold text-gray-900">Premium Quality Assurance</h3>
	        <p className="mt-1 text-indigo-600">Rigorous inspection protocols for flawless deliveries</p>
	      </div>
	    </div>
	  </div>

	  {/* Content with enhanced details */}
	  <div className="relative z-10 px-6 pb-8">
	    <div className="prose prose-indigo text-gray-700">
	      <p>
	        Our ISO 9001-certified quality management system ensures every shipment meets the highest industry standards through:
	      </p>
	      
	      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
	        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
	          <h4 className="font-semibold text-gray-900">Pre-Shipment Verification</h4>
	          <ul className="mt-2 space-y-2 text-sm">
	            <li className="flex items-start">
	              <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
	              </svg>
	              <span className="ml-2">AQL 2.5 inspection standards</span>
	            </li>
	            <li className="flex items-start">
	              <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
	              </svg>
	              <span className="ml-2">Packaging integrity tests</span>
	            </li>
	          </ul>
	        </div>

	        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500">
	          <h4 className="font-semibold text-gray-900">In-Transit Monitoring</h4>
	          <ul className="mt-2 space-y-2 text-sm">
	            <li className="flex items-start">
	              <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
	              </svg>
	              <span className="ml-2">Real-time condition tracking</span>
	            </li>
	            <li className="flex items-start">
	              <svg className="flex-shrink-0 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
	              </svg>
	              <span className="ml-2">Temperature/humidity logs</span>
	            </li>
	          </ul>
	        </div>
	      </div>

	      <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
	        <h4 className="font-bold text-indigo-800">Our Quality Promise:</h4>
	        <p className="mt-2 text-sm text-gray-700">
	          Every SkyPort shipment undergoes 17-point quality verification to guarantee damage-free delivery and complete compliance with your specifications. Our certified quality controllers document every checkpoint for full transparency.
	        </p>
	      </div>
	    </div>
	  </div>
	</div>

	<div className="my-8 grid grid-cols-1 py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto sm:grid-cols-3 gap-3">
	  {/* Request Quote - Primary */}
	  <a
	    href="/quotes"
	    className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
	  >
	    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
	    </svg>
	    Get Quote
	  </a>

	  {/* Contact Us - Secondary */}
	  <a
	    href="/contact"
	    className="flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-md border border-indigo-300 text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-200"
	  >
	    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
	    </svg>
	    Contact
	  </a>

	  {/* Phone Call - Accent */}
	  <a
	    href={`tel:+255794341226`}
	    className="flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
	  >
	    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
	      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
	    </svg>
	    Call Now
	  </a>
	</div>

	 <footer className="bg-gray-50 border-t border-gray-200 py-8">
	      <div className="container mx-auto px-4 max-w-7xl">
	        {/* Main footer content */}
	        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
	          {/* Copyright section */}
	          <div className="flex items-center text-gray-600">
	            <Copyright className="h-4 w-4 mr-1.5" />
	            <span className="text-sm">
	              {currentYear} <span className="font-medium">SkyPort Cargo</span>. All rights reserved.
	            </span>
	          </div>

	          {/* Legal links with Lucide icons */}
	          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
	            <a 
	              href="/terms" 
	              className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
	            >
	              <FileText className="h-4 w-4 mr-1.5" />
	              Terms
	            </a>
	            <a 
	              href="/policies" 
	              className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
	            >
	              <Shield className="h-4 w-4 mr-1.5" />
	              Privacy
	            </a>
	          </div>
	        </div>

		{/* Made with love - Highlighted */}
		<div className="mt-6 flex justify-center">
		  <div className="inline-flex items-center px-3 py-2 text-xs text-gray-600">
		    <Globe className="h-3 w-3 mr-1.5 text-blue-500" />
		    <span>Proudly serving with </span>
		    <Heart className="h-3 w-3 mx-1 text-rose-500 fill-rose-500/10" />
		    <span>between China and Tanzania</span>
		  </div>
		</div>

	      </div>
	    </footer>

        </div>
    );
}
