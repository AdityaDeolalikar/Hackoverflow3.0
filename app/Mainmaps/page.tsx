"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Define interfaces for better type safety
interface City {
  name: string;
  lat: number;
  lng: number;
}

interface WaqiData {
  status: string;
  data: {
    aqi: number;
    idx: number;
    city: {
      name: string;
      geo: number[];
    };
    dominentpol: string;
    iaqi: {
      [key: string]: {
        v: number;
      };
    };
    time: {
      s: string;
      iso: string;
    };
  };
}

// Add interface for weather data
interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
  };
}

// Add interface for soil data
interface SoilData {
  type: string;
  coordinates: number[];
  query_time_s: number;
  wrb_class_name: string;
  wrb_class_value: number;
  wrb_class_probability: [string, number][];
}

// Declare global types for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Major Indian cities with coordinates
const indianCities: City[] = [
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
];

// Add major Chinese cities for WAQI API
const chineseCities: City[] = [
  { name: "Beijing", lat: 39.9042, lng: 116.4074 },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
  { name: "Guangzhou", lat: 23.1291, lng: 113.2644 },
  { name: "Shenzhen", lat: 22.5431, lng: 114.0579 },
];

// Combine all cities
const allCities: City[] = [...indianCities, ...chineseCities];

const Page = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<City>(indianCities[0]);
  const [waqiData, setWaqiData] = useState<WaqiData | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [circles, setCircles] = useState<google.maps.Circle[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCities, setFilteredCities] = useState<City[]>(allCities);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  const initMap = useCallback(() => {
    if (!mapRef.current) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: selectedCity.lat, lng: selectedCity.lng },
      zoom: 10,
      mapTypeId: "roadmap",
    });

    setMap(newMap);
  }, [selectedCity]);

  const fetchWaqiData = useCallback(
    async (city: City) => {
      try {
        // Using the WAQI API with the provided token
        const token = process.env.NEXT_PUBLIC_WAQI_API_TOKEN;
        const response = await fetch(
          `https://api.waqi.info/feed/${city.name}/?token=${token}`
        );

        const data: WaqiData = await response.json();
        setWaqiData(data);

        // Display WAQI data on the map if available
        if (data && map && data.status === "ok") {
          displayWaqiOnMap(data, map);
        }
      } catch (error) {
        console.error("Error fetching WAQI data:", error);
      }
    },
    [map]
  );

  useEffect(() => {
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // Add script only if it doesn't exist
    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization,places&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else if (!script.onload) {
      // If script exists but no onload handler
      script.onload = initMap;
    }

    return () => {
      // Don't remove the script on unmount, just clean up the onload handler
      if (script) {
        script.onload = null;
      }
    };
  }, [initMap]);

  // Fetch air quality data when selected city changes
  useEffect(() => {
    if (selectedCity && map) {
      fetchWaqiData(selectedCity);

      // Center map on selected city
      map.setCenter({ lat: selectedCity.lat, lng: selectedCity.lng });
      
      // Fetch soil data when selected city changes
      fetchSoilData(selectedCity.lng, selectedCity.lat);
    }
  }, [selectedCity, map, fetchWaqiData]);

  const displayWaqiOnMap = (data: WaqiData, currentMap: google.maps.Map) => {
    // Clear previous markers and circles
    markers.forEach((marker) => marker.setMap(null));
    circles.forEach((circle) => circle.setMap(null));
    setMarkers([]);
    setCircles([]);

    if (data.status === "ok") {
      const aqi = data.data.aqi;

      // Create a circle to represent air quality
      const cityCircle = new window.google.maps.Circle({
        strokeColor: getAqiColor(aqi),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: getAqiColor(aqi),
        fillOpacity: 0.35,
        map: currentMap,
        center: { lat: selectedCity.lat, lng: selectedCity.lng },
        radius: 10000, // 10 km radius
      });

      setCircles([cityCircle]);

      // List pollutants
      const pollutantsHtml = Object.entries(data.data.iaqi)
        .map(([key, value]) => `<p>${key.toUpperCase()}: ${value.v}</p>`)
        .join("");

      // Add an info window with air quality data
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3>Air Quality in ${selectedCity.name}</h3>
            <p>AQI: ${aqi}</p>
            <p>Dominant Pollutant: ${data.data.dominentpol.toUpperCase()}</p>
            <p>Updated: ${data.data.time.s}</p>
            <hr>
            <h4>Pollutants:</h4>
            ${pollutantsHtml}
          </div>
        `,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: selectedCity.lat, lng: selectedCity.lng },
        map: currentMap,
        title: selectedCity.name,
      });

      setMarkers([marker]);

      marker.addListener("click", () => {
        infoWindow.open(currentMap, marker);
      });

      // Auto open info window
      infoWindow.open(currentMap, marker);
    }
  };

  // Get color based on AQI value
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "#00E400"; // Good
    if (aqi <= 100) return "#FFFF00"; // Moderate
    if (aqi <= 150) return "#FF7E00"; // Unhealthy for Sensitive Groups
    if (aqi <= 200) return "#FF0000"; // Unhealthy
    if (aqi <= 300) return "#99004C"; // Very Unhealthy
    return "#7E0023"; // Hazardous
  };

  interface NavItem {
    label: string;
    href: string;
  }

  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#impact" },
    { label: "Contact", href: "/#testimonials" },
    { label: "Login", href: "/login" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter cities based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCities(allCities);
    } else {
      const filtered = allCities.filter(city => 
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm]);

  // Fetch soil data from ISRIC API
  const fetchSoilData = async (longitude: number, latitude: number) => {
    try {
      const response = await fetch(
        `https://rest.isric.org/soilgrids/v2.0/classification/query?lon=${longitude}&lat=${latitude}&number_classes=5`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: SoilData = await response.json();
      setSoilData(data);
    } catch (error) {
      console.error("Error fetching soil data:", error);
    }
  };

  // Fetch weather data from WeatherAPI
  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      setIsLoadingWeather(true);
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data: WeatherData = await response.json();
      setWeatherData(data);
      setIsLoadingWeather(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setIsLoadingWeather(false);
    }
  };

  // Fetch weather data when selected city changes
  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity.lat, selectedCity.lng);
    }
  }, [selectedCity]);

  // Update the getUserLocation function to also fetch weather data
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setUserLocation(userCoords);
        
        // Fetch weather data for user location
        await fetchWeatherData(userCoords.lat, userCoords.lng);
        
        // If map exists, create a marker for user location and center the map
        if (map) {
          // Clear existing markers
          markers.forEach(marker => marker.setMap(null));
          setMarkers([]);
          
          // Create new marker for user location
          const userMarker = new window.google.maps.Marker({
            position: userCoords,
            map: map,
            title: "Your Location",
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
          });
          
          setMarkers(prev => [...prev, userMarker]);
          
          // Center map on user location
          map.setCenter(userCoords);
          
          // Fetch soil data for user location
          await fetchSoilData(userCoords.lng, userCoords.lat);
        }
        
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(`Error getting your location: ${error.message}`);
        setIsLoadingLocation(false);
      }
    );
  }, [map, markers]);

  return (
    <div>
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-gray-900 shadow-md" : "bg-gray-900/95"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              TerraSynth
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white hover:text-white/80 relative group transition-colors"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Button
                className="bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/signup">Signup</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden shadow-lg transition-all duration-300 ease-in-out",
            isMenuOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden",
            "bg-gray-800"
          )}
        >
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-white hover:text-white/80 hover:bg-white/10 py-3 transition-colors rounded-lg px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              className="mt-4 w-full bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/signup">Signup</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main content area with responsive layout */}
      <div className="pt-24 pb-4 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Location selector */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 rounded-lg shadow-lg h-full">
              <h2 className="text-xl font-bold mb-2">Select Location</h2>

              {/* User location button */}
              <Button 
                onClick={getUserLocation}
                className="w-full mb-4 bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? "Getting Location..." : "Use My Location"}
              </Button>

              {/* Improved location search with dropdown */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search or select location..."
                  className="w-full p-2 border rounded"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
                
                {/* Dropdown results */}
                {showDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                    {filteredCities.length === 0 ? (
                      <div className="p-2 text-gray-500">No locations found</div>
                    ) : (
                      filteredCities.map((city) => (
                        <div
                          key={city.name}
                          className={`p-2 cursor-pointer hover:bg-gray-100 ${
                            selectedCity.name === city.name ? "bg-blue-100" : ""
                          }`}
                          onClick={() => {
                            setSelectedCity(city);
                            setSearchTerm(city.name);
                            setShowDropdown(false);
                            // Fetch soil data for the selected city
                            fetchSoilData(city.lng, city.lat);
                            // Fetch weather data for the selected city
                            fetchWeatherData(city.lat, city.lng);
                          }}
                        >
                          {city.name}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              
              {/* Click outside to close dropdown */}
              {showDropdown && (
                <div 
                  className="fixed inset-0 z-0" 
                  onClick={() => setShowDropdown(false)}
                />
              )}

              {/* Display Weather Data */}
              {isLoadingWeather ? (
                <div className="mt-4 p-2 bg-gray-100 rounded">
                  <p>Loading weather data...</p>
                </div>
              ) : weatherData && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Weather</h3>
                    <span className="text-sm text-gray-500">{weatherData.location.localtime}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <img 
                      src={`https:${weatherData.current.condition.icon}`} 
                      alt={weatherData.current.condition.text}
                      className="w-16 h-16"
                    />
                    <div className="ml-2">
                      <p className="text-2xl font-bold">{weatherData.current.temp_c}°C</p>
                      <p className="text-sm">{weatherData.current.condition.text}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="text-sm">
                      <p><strong>Feels like:</strong> {weatherData.current.feelslike_c}°C</p>
                      <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Wind:</strong> {weatherData.current.wind_kph} km/h {weatherData.current.wind_dir}</p>
                      <p><strong>Visibility:</strong> {weatherData.current.vis_km} km</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Display WAQI Data */}
              {waqiData && waqiData.status === "ok" && (
                <div className="mt-4 p-2 bg-gray-100 rounded">
                  <p>
                    <strong>AQI:</strong> {waqiData.data.aqi}
                  </p>
                  <p>
                    <strong>Dominant Pollutant:</strong>{" "}
                    {waqiData.data.dominentpol.toUpperCase()}
                  </p>
                  <p>
                    <strong>Updated:</strong> {waqiData.data.time.s}
                  </p>
                </div>
              )}

              {/* Display Soil Data */}
              {soilData && (
                <div className="mt-4 p-2 bg-gray-100 rounded">
                  <h3 className="font-bold text-lg mb-2">Soil Information</h3>
                  <p>
                    <strong>Main Soil Type:</strong> {soilData.wrb_class_name}
                  </p>
                  <p className="mb-2">
                    <strong>Coordinates:</strong> {soilData.coordinates[1].toFixed(4)}, {soilData.coordinates[0].toFixed(4)}
                  </p>
                  
                  <h4 className="font-semibold">Soil Type Probabilities:</h4>
                  <ul className="mt-1">
                    {soilData.wrb_class_probability.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item[0]}</span>
                        <span>{item[1]}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Map container */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-2">
              <h2 className="text-xl font-bold">Air Quality Map</h2>
              <p className="text-sm text-gray-500">Showing data for {selectedCity.name}</p>
            </div>
            <div className="h-[400px] md:h-[450px] relative w-full rounded-lg shadow-lg overflow-hidden">
              <div
                ref={mapRef}
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
