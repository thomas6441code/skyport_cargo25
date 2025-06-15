import { useState } from 'react';
import { Menu, X, Phone, Mail, Plane, Warehouse, Globe, LucideMessageCircleQuestion, Building2Icon } from 'lucide-react';
import { Link } from '@inertiajs/react';

type MegaMenuValue = 'mobile-services' | 'other-menu' | 'services' | null;

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState<MegaMenuValue>(null);

    const services = [
        { icon: <Plane className="w-5 h-5" />, title: 'Air Freight', items: ['Express Air', 'Charter Services', 'Perishables'] },
        { icon: <Building2Icon className="w-5 h-5" />, title: 'Export Services', items: ['FCL', 'LCL', 'Bulk Cargo'] },
        { icon: <Warehouse className="w-5 h-5" />, title: 'Out Sourcing', items: ['Warehousing', 'Distribution', 'Inventory'] },
        { icon: <Globe className="w-5 h-5" />, title: 'Customs', items: ['Clearance', 'Documentation', 'Support'] }
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
                        <a href="tel:+255764419171" className="flex md:hidden items-center hover:text-gray-300 transition-colors">
                            <Phone className="w-4 h-4 mr-1" />
                        </a>
                        <a href="mailto:info@skyport.com" className="flex md:hidden items-center hover:text-gray-300 transition-colors">
                            <Mail className="w-4 h-4 mr-1" />
                        </a>
                        <a href="/#question" className="md:flex  hidden items-center hover:text-gray-300 transition-colors">
                            <LucideMessageCircleQuestion className="w-4 h-4 mr-1" /> Faqs
                        </a>
                        <a href="tel:+255764419171" className="md:flex hidden  items-center hover:text-gray-300 transition-colors">
                            <Phone className="w-4 h-4 mr-1" /> +255 764 419 171
                        </a>
                        <a href="mailto:info@skyport.com" className="md:flex  hidden  items-center hover:text-gray-300 transition-colors">
                            <Mail className="w-4 h-4 mr-1" /> info@skyport.com
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-3">
                        <span className="text-gray-200">Tracking ID?</span>
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

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 min-h-[85vh] overflow-y-auto md:hidden border-2 border-black rounded-b-sm">
                    <div className="flex justify-between items-center p-4 border-b bg-white">
                        <Link href="/" className="flex items-center space-x-2">
                            <img src="/logo.svg" alt="SKYPORT CARGO" className="h-10" />
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-1 p-4 min-h-screen">
                        <Link
                            href="/"
                            className="py-3 px-4 rounded-md hover:bg-white text-lg font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <button
                            className="py-3 px-4 rounded-md hover:bg-white text-lg font-medium text-left flex justify-between items-center"
                            onClick={() => setMegaMenuOpen((megaMenuOpen === 'mobile-services') ? null : 'mobile-services')}
                        >
                            Services
                            <Menu className={`h-5 w-5 transition-transform ${megaMenuOpen === 'mobile-services' ? 'rotate-180' : ''}`} />
                        </button>

                        {megaMenuOpen === 'mobile-services' && (
                            <div className="pl-6 space-y-2">
                                {services.map((service, index) => (
                                    <div key={index} className="mb-4 z-50">
                                        <div className="flex items-center mb-2 text-indigo-600">
                                            {service.icon}
                                            <h3 className="ml-2 font-medium">{service.title}</h3>
                                        </div>
                                        <ul className="space-y-2 pl-6">
                                            {service.items.map((item, i) => (
                                                <li key={i}>
                                                    <Link
                                                        href="/services"
                                                        className="block py-2 text-gray-600 hover:text-indigo-600 hover:bg-white/70 rounded px-2"
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

                        {['About Us', 'Tracking', 'Get Quote', 'Contact'].map((item) => {
                            if (item === 'Get Quote') {
                                return (
                                    <Link
                                        key={item}
                                        href={`/quotes`}
                                        className="py-3 px-4 rounded-md hover:bg-white text-lg font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                );
                            } else {
                                return (
                                    <Link
                                        key={item}
                                        href={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="py-3 px-4 rounded-md hover:bg-white text-lg font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                );
                            }
                        })}
                    </nav>

                    <div className="p-4 mt-4 border-t bg-white/80">
                        <a
                            href="tel:+255746696695"
                            className="flex items-center py-3 px-4 rounded-md hover:bg-white"
                        >
                            <Phone className="w-5 h-5 mr-3 text-indigo-600" />
                            <span>+255 (746) 696-695</span>
                        </a>
                        <a
                            href="mailto:info@skyport.com"
                            className="flex items-center py-3 px-4 rounded-md hover:bg-white mt-2"
                        >
                            <Mail className="w-5 h-5 mr-3 text-indigo-600" />
                            <span>info@skyport.com</span>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
