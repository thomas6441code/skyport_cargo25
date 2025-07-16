import { useState, useEffect } from 'react';

export default function WhatsAppFloater() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.whatsapp-floater')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      setIsPulsing(false);
    } else {
      setTimeout(() => setIsPulsing(true), 10000);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const whatsappLink = `https://wa.me/255794341226?text=""`;

  const services = [
    "Air Cargo",
    "Customs Clearance",
    "Export Services",
    "Out Sourcing"
  ];

  return (
    <div className={`fixed bottom-6 left-6 z-50 whatsapp-floater ${!isVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      {/* WhatsApp Button with SVG */}
      <div 
        className={`relative w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 ${isOpen ? 'rotate-0' : 'rotate-0'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* WhatsApp SVG Icon */}
        <svg 
          className="w-8 z-50 h-8 text-white" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        
        {/* Pulsing animation */}
        {isPulsing && (
          <>
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-50 animate-pulse" />
          </>
        )}
      </div>

      {/* Services Panel */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-60 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300">
          <div className="bg-green-600 p-4 text-white">
            <h3 className="font-bold text-lg">SkyPort Cargo Support</h3>
            <p className="text-sm">How can we help you today?</p>
          </div>
          
          <div className="p-4">
            <ul className="space-y-2 mb-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{service}</span>
                </li>
              ))}
            </ul>
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded-lg transition-colors duration-300 font-medium"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
