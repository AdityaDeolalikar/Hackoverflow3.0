"use client";

import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";

// Define interfaces for better type safety
interface City {
  name: string;
  lat: number;
  lng: number;
}

interface AirQualityData {
  indexes?: Array<{
    aqi: number;
    category: string;
  }>;
  pollutants?: Array<{
    displayName: string;
    concentration: number;
    unit: string;
  }>;
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
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );
  const [waqiData, setWaqiData] = useState<WaqiData | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [circles, setCircles] = useState<google.maps.Circle[]>([]);
  const [apiSource, setApiSource] = useState<"google" | "waqi">("google");

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDeBXAqwT2DaWTyEnL-97ZgNmlT9be8xTg&libraries=visualization,places&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Fetch air quality data when selected city changes
  useEffect(() => {
    if (selectedCity && map) {
      if (apiSource === "google") {
        fetchAirQualityData(selectedCity);
      } else {
        fetchWaqiData(selectedCity);
      }

      // Center map on selected city
      map.setCenter({ lat: selectedCity.lat, lng: selectedCity.lng });
    }
  }, [selectedCity, map, apiSource]);

  const initMap = () => {
    if (!mapRef.current) return;

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: selectedCity.lat, lng: selectedCity.lng },
      zoom: 10,
      mapTypeId: "roadmap",
    });

    setMap(newMap);
  };

  const fetchAirQualityData = async (city: City) => {
    try {
      const response = await fetch(
        `https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyDeBXAqwT2DaWTyEnL-97ZgNmlT9be8xTg`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: {
              latitude: city.lat,
              longitude: city.lng,
            },
          }),
        }
      );

      const data = await response.json();
      setAirQualityData(data);
      setWaqiData(null);

      // Display air quality data on the map if available
      if (data && map) {
        displayAirQualityOnMap(data, map);
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    }
  };

  const fetchWaqiData = async (city: City) => {
    try {
      // Using the WAQI API with the provided token
      const token = "75329b24040dbb61fd12b7baaf5f478d824b28e5";
      const response = await fetch(
        `https://api.waqi.info/feed/${city.name}/?token=${token}`
      );

      const data: WaqiData = await response.json();
      setWaqiData(data);
      setAirQualityData(null);

      // Display WAQI data on the map if available
      if (data && map && data.status === "ok") {
        displayWaqiOnMap(data, map);
      }
    } catch (error) {
      console.error("Error fetching WAQI data:", error);
    }
  };

  const displayAirQualityOnMap = (
    data: AirQualityData,
    currentMap: google.maps.Map
  ) => {
    // Clear previous markers and circles
    markers.forEach((marker) => marker.setMap(null));
    circles.forEach((circle) => circle.setMap(null));
    setMarkers([]);
    setCircles([]);

    if (data.indexes && data.indexes.length > 0) {
      const aqi = data.indexes[0].aqi;

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

      // Add an info window with air quality data
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3>Air Quality in ${selectedCity.name}</h3>
            <p>AQI: ${aqi}</p>
            <p>Category: ${data.indexes[0].category}</p>
            ${
              data.pollutants
                ? `<p>Main Pollutant: ${
                    data.pollutants[0]?.displayName || "N/A"
                  }</p>`
                : ""
            }
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

  return (
    <div>
      <div className="relative w-full h-screen">
        {/* Location selector */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Select Location</h2>

          {/* API Source Selector */}
          <div className="mb-4">
            <label className="block mb-2">API Source:</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setApiSource("google")}
                className={`px-3 py-1 rounded ${
                  apiSource === "google"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Google API
              </button>
              <button
                onClick={() => setApiSource("waqi")}
                className={`px-3 py-1 rounded ${
                  apiSource === "waqi"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                WAQI API
              </button>
            </div>
          </div>

          <select
            className="w-full p-2 border rounded"
            value={selectedCity.name}
            onChange={(e) => {
              const city = allCities.find(
                (city) => city.name === e.target.value
              );
              if (city) setSelectedCity(city);
            }}
          >
            {allCities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Display Google Air Quality Data */}
          {airQualityData && airQualityData.indexes && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <p>
                <strong>AQI:</strong> {airQualityData.indexes[0]?.aqi || "N/A"}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {airQualityData.indexes[0]?.category || "N/A"}
              </p>
            </div>
          )}

          {/* Display WAQI Data */}
          {waqiData && waqiData.status === "ok" && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
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
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={mapRef}
            style={{ width: "80%", height: "80%", border: 0 }}
            className="rounded shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
