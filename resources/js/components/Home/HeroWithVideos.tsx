import { 
  ArrowRight, 
  Plane, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Box,
  Globe,
  BarChart2,
  Warehouse,
  CalendarCheck,
  RadioTower,
  Cloud,
  PackageCheck
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { Link } from "@inertiajs/react";

interface RouteStop {
  id?: number;
  location: string;
  code: string;
  order?: number;
}

interface FlightRoute {
  id?: number;
  origin_city: string;
  origin_code: string;
  destination_city: string;
  destination_code: string;
  duration: string;
  active: boolean;
  departure_time: string;
  arrival_time: string;
  stops: RouteStop[];
  created_at?: string;
  updated_at?: string;
}


interface Props {
  routes: FlightRoute[];
}

export default function SpaceCargoHero({routes}:Props) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const features = [
    {
      icon: <Plane className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Fastest Transit",
      desc: "48 hour direct flights"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Secure Shipping",
      desc: "100% cargo insurance"
    },
    {
      icon: <Box className="w-6 h-6 md:w-8 md:h-8" />,
      title: "All Cargo Types",
      desc: "Documents to machinery"
    }
  ];

  useEffect(() => {
    // Check if mobile device
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
    
    // Set up feature rotation
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [features.length]);


  return (
    <div className="relative md:px-10 md:py-10 py-5 w-full min-h-[80vh] overflow-hidden rounded-xl border border-gray-700 shadow-xl">
      {/* GIF Background - Earth Rotation */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">

	 <video
	        autoPlay
	        loop
	        muted
	        playsInline
	        className="absolute inset-0 w-full h-full object-cover rounded-xl"
	      >
	        <source src="/videos/earth_hero_bg.webm" type="video/webm" />
        </video>
      
	  <div className="absolute inset-0 bg-black/70 rounded-xl"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full min-h-[80vh] flex flex-col p-4 md:p-4">
        {/* Navigation */}
        <header className="flex justify-between items-center mb-4 md:mb-6">
          <div className="flex items-center space-x-2">
            <RadioTower className="text-blue-400 w-6 h-6 md:w-8 md:h-8" />
            <span className="text-xl md:text-2xl font-bold text-white">SkyPort Cargo</span>
          </div>
          {/* <Link 
            href="/login" 
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-blue-400 text-blue-300 hover:bg-blue-400/10 transition-colors duration-300 text-sm md:text-base"
          >
            Client Portal
          </Link> */}
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col lg:flex-row items-center gap-2">
          {/* Left Content */}
          <div className="w-full md:w-1/3 space-y-4 md:space-y-6 py-4 md:py-6 px-2 lg:py-0">
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-300 text-sm md:text-base">
              <PackageCheck className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span>Intercontinental Air Transport</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
                China-Tanzania
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-medium">
                Air Cargo Specialists
              </span>
            </h1>
            
	<p className="text-base md:text-sm text-white/80 max-w-lg leading-relaxed">
	  Our premium air cargo solutions provide fast, reliable global shipping with end-to-end visibility. 
	  Benefit from real-time  tracking, temperature-controlled options for sensitive shipments, 
	  and expedited customs clearance . We assist customers in paying their suppliers when purchasing goods from China. We also provide local delivery services in Tanzania once the goods arrive  
	  with transit times as fast as 48 hours for urgent shipments.
	</p>
             
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                href="/quotes" 
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 text-sm md:text-base"
              >
                Get Quote <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link 
                href="/tracking" 
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 px-6 py-3 rounded-lg font-bold text-white border border-white/20 transition-all duration-300 text-sm md:text-base"
              >
                Live Tracking
              </Link>
            </div>
          </div>

          {/* Right Content - Now visible on mobile */}
          <div className="w-full md:w-2/3 relative md:pl-6">
            <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-400/10 backdrop-blur-md rounded-xl border border-white/20 p-4 overflow-hidden min:h-80">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center">
                <MapPin className="text-blue-300 w-5 h-5 md:w-6 md:h-6 mr-2" />
                Active Flight Route
              </h2>
              
	   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
		{routes.map((route) => (
		    <div
		      key={route.id}
		      className={`p-4 rounded-lg transition-all duration-300 ${
		        route.active
		          ? 'bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30'
		          : 'bg-white/5 hover:bg-white/10 border border-white/10'
		      }`}
		    >
		      <div className="flex justify-between items-start">
		        <div className="flex-1">
		          <div className="flex items-center space-x-2">
		            <div className={`w-2 h-2 rounded-full ${
		              route.active ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
		            }`} />
		            <span className="font-medium text-white text-sm">
		              {route.origin_city} ({route.origin_code})
		            </span>
		          </div>
		          
		          {/* Flight path with stops */}
		          <div className="ml-2 mt-2 space-y-1">

                            {route.departure_time && (<div className="flex items-center space-x-2">
		              <Plane className="w-3 h-3 text-blue-300 rotate-90" />
		              <span className="text-xs text-blue-300">
		                Departs: {route.departure_time}
		              </span>
		            </div>)}

		            {route.stops.map((stop, index) => (
		              <div key={stop.id} className="flex items-center space-x-2 ml-4">
		                <div className="w-2 h-2 rounded-full bg-amber-400" />
		                <span className="text-xs text-white/80">
		                  Stop {index + 1}: {stop.location} ({stop.code})
		                </span>
		              </div>
		            ))}

                            {route.arrival_time && (<div className="flex items-center space-x-2">
		              <Plane className="w-3 h-3 text-blue-300 rotate-90" />
		              <span className="text-xs text-blue-300">
				 Arrives: {route.arrival_time} (+{Math.floor(parseInt(route.duration)/24)})
		              </span>
		            </div>)}
		            
		          </div>
		          
		          <div className="flex items-center space-x-2 mt-2">
		            <div className="w-2 h-2 rounded-full bg-blue-400" />
		            <span className="font-medium text-white text-sm">
		              {route.destination_city} ({route.destination_code})
		            </span>
		          </div>
		        </div>

		        <div className="text-right space-y-1">
		          <div className="text-blue-300 font-medium text-sm">
		            {route.duration}Hrs
		          </div>
		          <div className="text-xs text-white/70">
		            {route.stops.length > 0 ? (
		              <>
		                {route.stops.length} {route.stops.length === 1 ? 'stop' : 'stops'}
		                <div className="mt-1 text-white/60 text-[11px]">
		                  via {route.stops.map(s => s.location).join(', ')}
		                </div>
		              </>
		            ) : (
		              'Non-stop'
		            )}
		          </div>
		          {!route.active && (
		            <div className="text-xs text-amber-400 mt-1">
		              Coming soon
		            </div>
		          )}
		        </div>
		      </div>

		      {route.active && (
		        <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
		          <span className="text-xs text-white/70">
		            {route.stops.length > 0 ? (
				`Total transit: ${Math.floor(parseInt(route.duration)/24) - 1} days`
		            ) : (
		              'Direct flight'
		            )}
		          </span>
		          <Link
		            href="/quotes"
		            className="text-xs text-blue-300 hover:text-blue-200 transition-colors"
		          >
		            Get Quote →
		          </Link>
		        </div>
		      )}
		    </div>
		  ))}
		</div>
              {/* Rotating Features */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="relative h-20 md:h-24">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${index === currentFeature ? 'opacity-100' : 'opacity-0'} px-2`}
                    >
                      <div className="flex items-start">
                        <div className="bg-white/10 p-2 rounded-lg mr-2">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-sm">{feature.title}</h3>
                          <p className="text-xs text-white/80">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Stats Bar */}
        <div className="mt-auto pt-7">
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-3 grid grid-cols-2 md:grid-cols-4 gap-3 border border-white/10">
            {[
              { icon: <CalendarCheck className="w-5 h-5" />, value: "24/7", label: "Operations" },
              { icon: <Clock className="w-5 h-5" />, value: "48h", label: "Fastest" },
              { icon: <ShieldCheck className="w-5 h-5" />, value: "100%", label: "Secure" },
              { icon: <Plane className="w-5 h-5" />, value: "12", label: "Flights" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="bg-blue-500/20 p-1.5 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/80">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
