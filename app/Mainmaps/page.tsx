"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Menu, X, MapPin, Thermometer, Wind, Droplets, Eye, AlertCircle } from "lucide-react";
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
    precip_mm: number;
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

// Define interface for Tree data
interface Tree {
  name: string;
  suitability: string;
  reason: string;
}

// Define interface for API response
interface TreeRecommendationResponse {
  recommended_trees: Tree[];
  optimum_tree: Tree;
  input_data: {
    temperature: number;
    precipitation: number;
    aqi: number;
    soil_type: string;
  };
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

// Sample data for trees
const trees: Tree[] = [
  { name: "Neem", suitability: "High", reason: "Neem is drought-resistant and improves soil fertility." },
  { name: "Banyan", suitability: "Medium", reason: "Banyan provides excellent shade and supports biodiversity." },
  { name: "Peepal", suitability: "High", reason: "Peepal is known for its air-purifying properties." },
];

// Function to determine the optimum tree
const getOptimumTree = (trees: Tree[]): Tree => {
  // For simplicity, return the first tree with 'High' suitability
  return trees.find(tree => tree.suitability === "High") || trees[0];
};

const Page = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<City>({ name: "Delhi", lat: 28.6139, lng: 77.209 });
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
  const [treeRecommendations, setTreeRecommendations] = useState<Tree[]>([]);
  const [optimumTree, setOptimumTree] = useState<Tree | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState<boolean>(false);

  const initMap = useCallback(() => {
    if (!mapRef.current) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: selectedCity.lat, lng: selectedCity.lng },
      zoom: 10,
      mapTypeId: "roadmap",
    });

    setMap(newMap);
  }, [selectedCity]);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

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
      script.onload = initMap;
    }
  }, [initMap]);

  useEffect(() => {
    if (map) {
      map.setCenter({ lat: selectedCity.lat, lng: selectedCity.lng });
    }
  }, [selectedCity, map]);

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
      

      // Add an info window with air quality data
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3>Air Quality in ${selectedCity.name}</h3>
            <p>AQI: ${aqi}</p>
            <p>Dominant Pollutant: ${data.data.dominentpol.toUpperCase()}</p>
            <p>Updated: ${data.data.time.s}</p>
            <hr>
           
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
          
          // Create an info window for the user's location
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px;">
                <h3>Your Current Location</h3>
                <p>Latitude: ${userCoords.lat.toFixed(6)}</p>
                <p>Longitude: ${userCoords.lng.toFixed(6)}</p>
              </div>
            `
          });
          
          // Open info window when marker is clicked
          userMarker.addListener('click', () => {
            infoWindow.open(map, userMarker);
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
  }, [map, markers, fetchWeatherData, fetchSoilData]);

  useEffect(() => {
    const initAutocomplete = () => {
      const input = document.getElementById('location-input') as HTMLInputElement;
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          console.error("No location found");
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        // You can set the selected city or perform any action with the coordinates here
        const placeName = place.name || "Selected Location";
        setSelectedCity({ name: placeName, lat, lng });
      });
    };

    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
    } else {
      const scriptId = 'google-maps-places-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.head.appendChild(script);
      } else if (!script.onload) {
        script.onload = initAutocomplete;
      }
    }
  }, []);

  // Function to get tree recommendations from the API
  const fetchTreeRecommendations = async () => {
    // Only fetch if we have all the necessary data
    if (!weatherData || !waqiData || !soilData || waqiData.status !== "ok") {
      console.log("Missing data required for tree recommendations");
      return;
    }

    try {
      setIsLoadingRecommendations(true);
      
      // Prepare payload with data from different APIs
      const payload = {
        temperature: weatherData.current.temp_c,
        precipitation: weatherData.current.precip_mm,
        aqi: waqiData.data.aqi,
        soil_type: soilData.wrb_class_name
      };

      // Call backend API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: TreeRecommendationResponse = await response.json();
      
      // Update state with the recommendations
      setTreeRecommendations(data.recommended_trees);
      setOptimumTree(data.optimum_tree);
      
      setIsLoadingRecommendations(false);
    } catch (error) {
      console.error("Error fetching tree recommendations:", error);
      setIsLoadingRecommendations(false);
      
      // Fallback to sample data in case of error
      setTreeRecommendations(trees);
      setOptimumTree(getOptimumTree(trees));
    }
  };

  // Fetch tree recommendations when all necessary data is available
  useEffect(() => {
    if (weatherData && waqiData && waqiData.status === "ok" && soilData) {
      fetchTreeRecommendations();
    }
  }, [weatherData, waqiData, soilData]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-gradient-to-r from-emerald-900 to-teal-800 shadow-lg" : "bg-gradient-to-r from-emerald-800 to-teal-700"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white hover:opacity-80 transition-all duration-300 hover:scale-105 flex items-center"
            >
             
              Van Rakshak
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
                className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/signup">Sign Up</Link>
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
            "bg-gradient-to-r from-emerald-900 to-teal-800"
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
              className="mt-4 w-full bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main content area with responsive layout */}
      <div className="pt-28 pb-8 container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Environmental Dashboard</h1>
          <p className="text-gray-600">Monitor air quality, weather conditions, and soil data for any location</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Location selector */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-md h-full border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <MapPin className="mr-2 text-emerald-600" size={20} />
                Select Location
              </h2>

              {/* Google Maps Places Autocomplete Input */}
              <input
                id="location-input"
                type="text"
                placeholder="Search a place"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />

              {/* User location button */}
              <Button 
                onClick={getUserLocation}
                className="w-full mt-5 mb-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 rounded-xl h-12 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? "Getting Location..." : "Use My Location"}
              </Button>

              {/* Improved location search with dropdown */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search or select location..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
                
                {/* Dropdown results */}
                {showDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {filteredCities.length === 0 ? (
                      <div className="p-3 text-gray-500">No locations found</div>
                    ) : (
                      filteredCities.map((city) => (
                        <div
                          key={city.name}
                          className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedCity.name === city.name ? "bg-emerald-50 text-emerald-700" : ""
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
                <div className="mt-6 p-4 bg-gray-50 rounded-xl animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ) : weatherData && (
                <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-blue-800">Weather</h3>
                    <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{weatherData.location.localtime}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <img 
                      src={`https:${weatherData.current.condition.icon}`} 
                      alt={weatherData.current.condition.text}
                      className="w-20 h-20"
                    />
                    <div className="ml-3">
                      <p className="text-3xl font-bold text-blue-900">{weatherData.current.temp_c}°C</p>
                      <p className="text-blue-700">{weatherData.current.condition.text}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center text-sm text-blue-800 mb-1.5">
                        <Thermometer size={16} className="mr-1.5" />
                        <span>Feels like</span>
                      </div>
                      <p className="font-semibold text-lg">{weatherData.current.feelslike_c}°C</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center text-sm text-blue-800 mb-1.5">
                        <Droplets size={16} className="mr-1.5" />
                        <span>Humidity</span>
                      </div>
                      <p className="font-semibold text-lg">{weatherData.current.humidity}%</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center text-sm text-blue-800 mb-1.5">
                        <Wind size={16} className="mr-1.5" />
                        <span>Wind</span>
                      </div>
                      <p className="font-semibold text-lg">{weatherData.current.wind_kph} km/h</p>
                      <p className="text-xs text-gray-500">{weatherData.current.wind_dir}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center text-sm text-blue-800 mb-1.5">
                        <Eye size={16} className="mr-1.5" />
                        <span>Visibility</span>
                      </div>
                      <p className="font-semibold text-lg">{weatherData.current.vis_km} km</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm col-span-2">
                      <div className="flex items-center text-sm text-blue-800 mb-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                          <path d="M16 14v6"></path>
                          <path d="M8 14v6"></path>
                          <path d="M12 16v6"></path>
                        </svg>
                        <span>Precipitation</span>
                      </div>
                      <p className="font-semibold text-lg">{weatherData.current.precip_mm} mm</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Display WAQI Data */}
              {waqiData && waqiData.status === "ok" && (
                <div className="mt-6 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-amber-800 flex items-center">
                      <AlertCircle size={18} className="mr-2" />
                      Air Quality
                    </h3>
                    <div className={`px-3 py-1 rounded-full font-bold ${
                      waqiData.data.aqi <= 50 ? "bg-green-100 text-green-700" :
                      waqiData.data.aqi <= 100 ? "bg-yellow-100 text-yellow-700" :
                      waqiData.data.aqi <= 150 ? "bg-orange-100 text-orange-700" :
                      waqiData.data.aqi <= 200 ? "bg-red-100 text-red-700" :
                      waqiData.data.aqi <= 300 ? "bg-purple-100 text-purple-700" :
                      "bg-pink-100 text-pink-700"
                    }`}>
                      AQI: {waqiData.data.aqi}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <p className="mb-2">
                      <span className="font-medium text-amber-800">Status:</span>{" "}
                      {waqiData.data.aqi <= 50 ? "Good" :
                       waqiData.data.aqi <= 100 ? "Moderate" :
                       waqiData.data.aqi <= 150 ? "Unhealthy for Sensitive Groups" :
                       waqiData.data.aqi <= 200 ? "Unhealthy" :
                       waqiData.data.aqi <= 300 ? "Very Unhealthy" :
                       "Hazardous"}
                    </p>
                    
                    <p>
                      <span className="font-medium text-amber-800">Updated:</span>{" "}
                      {waqiData.data.time.s}
                    </p>
                  </div>
                  
                  
                </div>
              )}

              {/* Display Soil Data */}
              {soilData && (
                <div className="mt-6 p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100 shadow-sm">
                  <h3 className="font-bold text-lg text-emerald-800 mb-3">Soil Information</h3>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <p className="mb-2">
                      <span className="font-medium text-emerald-800">Main Soil Type:</span>{" "}
                      <span className="font-bold">{soilData.wrb_class_name}</span>
                    </p>
                    <p>
                      <span className="font-medium text-emerald-800">Coordinates:</span>{" "}
                      {soilData.coordinates[1].toFixed(4)}, {soilData.coordinates[0].toFixed(4)}
                    </p>
                  </div>
                  
                 
                </div>
              )}
            </div>
          </div>

          {/* Map container */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="bg-white p-5 rounded-2xl shadow-md mb-4 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Air Quality Map</h2>
              <p className="text-gray-500">Showing environmental data for {selectedCity.name}</p>
            </div>
            <div className="h-[500px] md:h-[600px] relative w-full rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div ref={mapRef} className="absolute inset-0" />
            </div>

            {/* Tree Recommendation Section */}
            <div className="mt-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tree Recommendations</h2>
              <p className="text-gray-600 mb-6">Based on environmental factors in {selectedCity.name}</p>
              
              {/* Environmental Factors Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Temperature Card */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h3 className="text-sm font-medium text-blue-700 mb-1">Temperature</h3>
                  <div className="flex items-center">
                    <Thermometer className="text-blue-500 mr-2" size={20} />
                    <span className="text-2xl font-bold text-blue-900">
                      {weatherData ? `${weatherData.current.temp_c}°C` : "Loading..."}
                    </span>
                  </div>
                </div>
                
                {/* Air Quality Card */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <h3 className="text-sm font-medium text-amber-700 mb-1">Air Quality</h3>
                  <div className="flex items-center">
                    <AlertCircle className="text-amber-500 mr-2" size={20} />
                    <span className={`text-2xl font-bold ${
                      !waqiData || waqiData.status !== "ok" ? "text-gray-700" :
                      waqiData.data.aqi <= 50 ? "text-green-600" :
                      waqiData.data.aqi <= 100 ? "text-yellow-600" :
                      waqiData.data.aqi <= 150 ? "text-orange-600" :
                      waqiData.data.aqi <= 200 ? "text-red-600" :
                      waqiData.data.aqi <= 300 ? "text-purple-600" :
                      "text-pink-600"
                    }`}>
                      {waqiData && waqiData.status === "ok" ? `AQI: ${waqiData.data.aqi}` : "Loading..."}
                    </span>
                  </div>
                </div>
                
                {/* Soil Type Card */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <h3 className="text-sm font-medium text-emerald-700 mb-1">Soil Type</h3>
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-lg font-bold text-emerald-900 truncate">
                      {soilData ? soilData.wrb_class_name : "Loading..."}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Optimum Tree Recommendation */}
              {isLoadingRecommendations ? (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-16 bg-gray-200 rounded mb-2"></div>
                </div>
              ) : optimumTree ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 14V2m-2 12V2m-2 12V2m-2 12V2M5 13c-.4.8-.6 1.6-.7 2.5 0 .5-.1 1-.1 1.5a8 8 0 0016 0c0-1.4-.5-2.7-1.2-3.8a14 14 0 01-4 3.8c-1.5.9-3 1.4-4.7 1.5h-.4L7 17.3c-.7-1.3-1.3-2.6-1.7-4.3H5z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-green-800">Optimum Tree Recommendation</h3>
                          <p className="text-2xl font-bold text-green-900">{optimumTree.name}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg shadow-sm mt-4 md:mt-0 md:ml-4 md:max-w-md">
                      <p className="text-gray-700">
                        <span className="font-semibold text-green-700">Why this tree? </span>
                        {optimumTree.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100 mb-6">
                  <p className="text-yellow-700">Waiting for data to provide tree recommendations...</p>
                </div>
              )}
              
              {/* All Tree Recommendations */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">All Suitable Trees</h3>
              {isLoadingRecommendations ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="rounded-xl p-4 border border-gray-200 bg-gray-50 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(treeRecommendations.length > 0 ? treeRecommendations : trees).map((tree, index) => (
                    <div 
                      key={index} 
                      className={`rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${
                        tree.suitability === "High" 
                          ? "bg-green-50 border-green-200" 
                          : tree.suitability === "Medium"
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          tree.suitability === "High" 
                            ? "bg-green-500" 
                            : tree.suitability === "Medium"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}></div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          tree.suitability === "High" 
                            ? "bg-green-100 text-green-700" 
                            : tree.suitability === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {tree.suitability} Suitability
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 mb-1">{tree.name}</h4>
                      <p className="text-gray-600 text-sm">{tree.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
