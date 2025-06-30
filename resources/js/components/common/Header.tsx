import { useState } from 'react';
import {Facebook, Twitter, Instagram, Linkedin, Youtube, Menu, X, Phone, Mail, Plane, Warehouse, Globe, LucideMessageCircleQuestion, Building2Icon, ChevronDown } from 'lucide-react';
import { Link } from '@inertiajs/react';

type MegaMenuValue = 'mobile-services' | 'other-menu' | 'services' | null;

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState<MegaMenuValue>(null);

    const services = [
        { icon: <Plane className="w-5 h-5" />, title: 'Air Cargo', items: ['Express Cargo', 'Perishables', 'Explosive Items(Special Goods)'] },
        { icon: <Building2Icon className="w-5 h-5" />, title: 'Export Services', items: ['FCL', 'Bulk Cargo'] },
        { icon: <Warehouse className="w-5 h-5" />, title: 'Out Sourcing', items: ['Quality Cheking', 'Purchasing', 'Warehousing'] },
        { icon: <Globe className="w-5 h-5" />, title: 'Customs', items: ['Clearance', 'Documentation', 'Declaration'] }
    ];

    return (
        <header className="bg-white/5 backdrop-blur-xs text-black shadow-md fixed top-0 w-full z-50 transition-all duration-300 hover:bg-white">
            {/* Top Contact Bar - Now with transparent hover effect */}
            <div className="bg-black/90 hover:bg-black p-2 text-white text-sm transition-all duration-300">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm">
                        <a href="/#question" className="flex md:hidden items-center hover:text-gray-300 transition-colors">
                            <LucideMessageCircleQuestion className="w-4 h-4 mr-1" />
                        </a>
                        <a href="tel:+255794341226" className="flex md:hidden items-center hover:text-gray-300 transition-colors">
                            <Phone className="w-4 h-4 mr-1" />
                        </a>
                        <a href="mailto:skyportlogistics25@gmail.com" className="flex md:hidden items-center hover:text-gray-300 transition-colors">
                            <Mail className="w-4 h-4 mr-1" />
                        </a>
                        <a href="/#question" className="md:flex  hidden items-center hover:text-gray-300 transition-colors">
                            <LucideMessageCircleQuestion className="w-4 h-4 mr-1" /> Faqs
                        </a>
                        <a href="tel:+255794341226" className="md:flex hidden  items-center hover:text-gray-300 transition-colors">
                            <Phone className="w-4 h-4 mr-1" /> +255 794 341 226
                        </a>
                        <a href="mailto:skyportlogistics25@gmail.com" className="md:flex  hidden  items-center hover:text-gray-300 transition-colors">
                            <Mail className="w-4 h-4 mr-1" />skyportlogistics25@gmail.com
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-3">
                        <Link
                            href="/tracking"
                            className="border border-sky-50 text-sky-50 hover:bg-sky-500 px-4 py-1.5 rounded-md transition-colors duration-200 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Track Shipment
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="/logo.svg" alt="SKYPORT CARGO" className="h-12" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-2 h-full">
                        {['Home', 'About Us', 'Tracking', 'Services', 'Get Quote', 'Contact'].map((item) => {
                            if (item === 'Services') {
                                return (
                                    <div
                                        key={item}
                                        className="group relative flex h-full items-center"
                                        onMouseEnter={() => {
                                            setMegaMenuOpen(item.toLowerCase() as MegaMenuValue);
                                        }}
                                    >
                                        <button className="flex h-full items-center rounded-md bg-white/0 px-4 font-medium transition-colors hover:bg-white/90 hover:text-indigo-600">
                                            Services <Menu className="ml-1 h-4 w-4" />
                                        </button>
                                        <div className="absolute right-0 bottom-0 left-0 h-1 origin-left scale-x-0 transform bg-indigo-600 transition-transform group-hover:scale-x-100"></div>
                                    </div>
                                );
                            } else if (item === 'Get Quote') {
                                return (
                                    <div key={item} className="relative h-full flex items-center group">
                                        <Link
                                            href='/quotes'
                                            className="font-medium hover:text-indigo-600 transition-colors h-full flex items-center px-4 rounded-md bg-white/0 hover:bg-white/90"
                                        >
                                            {item}
                                        </Link>
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                                        ></div>
                                    </div>
                                );
                            } else if (item === 'Home') {
                                return (
                                    <div key={item} className="relative h-full flex items-center group">
                                        <Link
                                            href={`/`}
                                            className="font-medium hover:text-indigo-600 transition-colors h-full flex items-center px-4 rounded-md bg-white/0 hover:bg-white/90"
                                        >
                                            {item}
                                        </Link>
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                                        ></div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={item} className="relative h-full flex items-center group">
                                        <Link
                                            href={`/${item.toLowerCase().replace(' ', '-')}`}
                                            className="font-medium hover:text-indigo-600 transition-colors h-full flex items-center px-4 rounded-md bg-white/0 hover:bg-white/90"
                                        >
                                            {item}
                                        </Link>
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                                        ></div>
                                    </div>
                                );
                            }
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 p-2 rounded-md hover:bg-white/90 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-8 w-8" />
                    </button>
                </div>

                {/* Mega Menu */}
                {megaMenuOpen === 'services' && (
                    <div
                        className="absolute left-0 right-0 bg-white/90 backdrop-blur-sm shadow-xl z-50 py-8 border-t border-gray-200 transition-all duration-300"
                        onMouseLeave={() => setMegaMenuOpen(null)}
                    >
                        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="group">
                                    <div className="flex items-center mb-4 text-indigo-600">
                                        <div className="p-2 bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                                            {service.icon}
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-800">{service.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {service.items.map((item, i) => (
                                            <li key={i}>
                                                <Link
                                                    href="/services"
                                                    className="text-gray-600 hover:text-indigo-600 hover:pl-2 transition-all flex items-center hover:bg-white/70 rounded p-1"
                                                >
                                                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
	    {/* Modern Mobile Menu */}
		{mobileMenuOpen && (
		    <div className="fixed inset-0 bg-white z-50 min-h-screen overflow-y-auto md:hidden shadow-xl">
		        {/* Header with logo and close button */}
		        <div className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-100 bg-white z-10">
		            <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
		                <img src="/logo.svg" alt="SKYPORT CARGO" className="h-10" />
		            </Link>
		            <button
		                onClick={() => setMobileMenuOpen(false)}
		                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
		                aria-label="Close menu"
		            >
		                <X className="h-6 w-6 text-gray-600" />
		            </button>
		        </div>

		        {/* Main Navigation */}
		        <nav className="flex flex-col p-4 space-y-2">
		            <Link
		                href="/"
		                className="py-3 px-4 rounded-lg hover:bg-gray-50 text-lg font-semibold transition-colors"
		                onClick={() => setMobileMenuOpen(false)}
		            >
		                Home
		            </Link>

		            {/* Services Dropdown */}
		            <div className="mb-2">
		                <button
		                    className="w-full py-3 px-4 rounded-lg hover:bg-gray-50 text-lg font-semibold text-left flex justify-between items-center transition-colors"
		                    onClick={() => setMegaMenuOpen((megaMenuOpen === 'mobile-services') ? null : 'mobile-services')}
		                >
		                    Services
		                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${megaMenuOpen === 'mobile-services' ? 'rotate-180' : ''}`} />
		                </button>

		                {megaMenuOpen === 'mobile-services' && (
		                    <div className="mt-2 pl-2 space-y-1 animate-fadeIn">
		                        {services.map((service, index) => (
		                            <div key={index} className="mb-3">
		                                <div className="flex items-center p-3 rounded-lg bg-indigo-50">
		                                    {service.icon}
		                                    <h3 className="ml-2 font-medium text-indigo-700">{service.title}</h3>
		                                </div>
		                                <ul className="mt-1 space-y-1 pl-4">
		                                    {service.items.map((item, i) => (
		                                        <li key={i}>
		                                            <Link
		                                                href="/services"
		                                                className="block py-2.5 px-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
		                                                onClick={() => setMobileMenuOpen(false)}
		                                            >
		                                                {item}
		                                            </Link>
		                                        </li>
		                                    ))}
		                                </ul>
		                            </div>
		                        ))}
		                    </div>
		                )}
		            </div>

		            {/* Other Navigation Items */}
		            {['About Us', 'Tracking', 'Get Quote', 'Contact'].map((item) => (
		                <Link
		                    key={item}
		                    href={item === 'Get Quote' ? '/quotes' : `/${item.toLowerCase().replace(' ', '-')}`}
		                    className="py-3 px-4 rounded-lg hover:bg-gray-50 text-lg font-semibold transition-colors"
		                    onClick={() => setMobileMenuOpen(false)}
		                >
		                    {item}
		                </Link>
		            ))}
		        </nav>

		        {/* Contact Information */}
		        <div className="p-4 mt-2 border-t border-gray-100 bg-gray-50">
		            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider px-4 mb-3">Contact Us</h3>
		            
		            <a
		                href="tel:+255794341226"
		                className="flex items-center py-3 px-4 rounded-lg bg-white hover:bg-gray-100 transition-colors mb-2"
		            >
		                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 mr-3">
		                    <Phone className="w-5 h-5" />
		                </div>
		                <div>
		                    <p className="text-xs text-gray-500">Call us</p>
		                    <p className="font-medium">+255 794 341 226</p>
		                </div>
		            </a>
		            
		            <a
		                href="mailto:skyportlogistics25@gmail.com"
		                className="flex items-center py-3 px-4 rounded-lg bg-white hover:bg-gray-100 transition-colors"
		            >
		                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 mr-3">
		                    <Mail className="w-5 h-5" />
		                </div>
		                <div>
		                    <p className="text-xs text-gray-500">Email us</p>
		                    <p className="font-medium">skyportlogistics25@gmail.com</p>
		                </div>
		            </a>
		        </div>

		        {/* Social Links (optional) */}
			<div className="p-4 border-t border-gray-100 flex justify-center space-x-4">
			    {[
			        { 
			            name: 'Facebook', 
			            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>,
			            url: 'https://www.facebook.com/people/Skyport-Cargo/61575999210019/'
			        },
			        { 
			            name: 'Twitter', 
			            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
</svg>,
			            url: 'https://twitter.com'
			        },
			        { 
			            name: 'Instagram', 
			            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
			            url: 'https://www.instagram.com/skyportcargo/'
			        },
			        { 
			            name: 'LinkedIn', 
			            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
			            url: 'https://linkedin.com'
			        }
			    ].map((social) => (
			        <a 
			            key={social.name} 
			            href={social.url} 
			            target="_blank" 
			            rel="noopener noreferrer"
			            className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
			        >
			            <span className="sr-only">{social.name}</span>
			            <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center">
			                <div className="h-4 w-4">
			                    {social.icon}
			                </div>
			            </div>
			        </a>
			    ))}
			</div>
		    </div>
		)}
        </header>
    );
}
