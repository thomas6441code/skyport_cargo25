import React from 'react';
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <footer className="relative bg-black text-white pt-12 pb-6 overflow-hidden bottom-0 left-0 right-0">
            {/* Vertical strips with reduced visibility */}
            <div className="absolute inset-0 flex justify-center pointer-events-none">
                <div className="w-full max-w-7xl flex justify-between h-full">
                    {[...Array(175)].map((_, i) => (
                        <div
                            key={i}
                            className="w-px h-full bg-gray-800 opacity-20"
                        />
                    ))}
                </div>
            </div>

            {/* Footer content container */}
            <div className="container mx-auto px-10 relative z-10">
                {/* Top section with logo and social */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8">
                    {/* Logo section */}
                    <div className="flex items-center mb-6 md:mb-0">
                        <div className="p-3 mr-3">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2">
                                <img src="/flogo.svg" alt="SKYPORT CARGO" className="h-16" />
                            </Link>
                        </div>
                    </div>

                    {/* Social links */}
                    <div className="flex space-x-4">
                        {/* X (Twitter) */}
                        <a href="#" className="bg-gray-800 hover:bg-skyblue p-3 rounded-full transition-colors duration-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a href="#" className="bg-gray-800 hover:bg-skyblue p-3 rounded-full transition-colors duration-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/skyportcargo/" className="bg-gray-800 hover:bg-skyblue p-3 rounded-full transition-colors duration-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        {/* WhatsApp */}
                        <a href="#" className="bg-gray-800 hover:bg-skyblue p-3 rounded-full transition-colors duration-300">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Main footer content */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:px-16 mb-8">
                    {/* Column 1 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-skyblue">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                            <li><a href="/about-us" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                            <li><a href="/services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
                            <li><a href="/quotes" className="text-gray-400 hover:text-white transition-colors duration-300">Get Quote</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-skyblue">Services</h3>
                        <ul className="space-y-2">
                            <li><a href="/services/" className="text-gray-400 hover:text-white transition-colors duration-300">Air Cargo</a></li>
                            <li><a href="/services/" className="text-gray-400 hover:text-white transition-colors duration-300">Export Service</a></li>
                            <li><a href="/services/" className="text-gray-400 hover:text-white transition-colors duration-300">Customs Clearance</a></li>
                            <li><a href="/services/" className="text-gray-400 hover:text-white transition-colors duration-300">Out Sourcing</a></li>
                            
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-skyblue">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Partners</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Legal</a></li>
                        </ul>
                    </div>

                    {/* Column 4 - Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-skyblue">Contact Us</h3>
                        <address className="not-italic text-gray-400 space-y-2">
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-skyblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Lumumba & Mafia St. <br/> Dar es Salaam
                            </p>
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-skyblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +255 794 341 226
                            </p>
                            <p className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-skyblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                skyportlogistics25 @gmail.com
                            </p>
                        </address>
                    </div>
                </div>

                {/* Bottom strip */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm my-4 md:mb-0">
                        © {new Date().getFullYear()} SkyPort Cargo. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="/policies" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
                        <a href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
