import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import Swal from 'sweetalert2';
import pinIcon from '../Assets/Pin.svg';

const containerStyle = {
  width: '100%',
  height: '94vh',
};

// Global variables for caching map and script status
let cachedMap = null;
let scriptLoaded = false;

const HomePage = () => {
  const defaultCenter = useMemo(
    () => ({
      lat: 25.033671,
      lng: 121.564427,
    }),
    []
  );

  const [coords, setCoords] = useState(defaultCenter);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapRef = useRef(null);

  // Function to load Google Maps API asynchronously
  const loadGoogleMapsScript = () => {
    if (!scriptLoaded && !document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyAZsmXSzyeIXkdMQCNUpAyzb3OBIh0vm6w'}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoaded(true);
        scriptLoaded = true; // Mark script as loaded globally
      };
      document.head.appendChild(script);
    } else if (scriptLoaded) {
      setIsLoaded(true); // Mark as loaded if the script is already present
    }
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoords(userLocation); // Update the map center with user's location
          mapRef.current?.setCenter(userLocation); // Center map to user's location
        },
        () => {
          Swal.fire({
            position: 'middle',
            text: 'Please allow access to your location to use this feature.',
            icon: 'warning',
            showCloseButton: true,
            showConfirmButton: false,
          });
        }
      );
    } else {
      Swal.fire({
        position: 'middle',
        text: 'Geolocation is not supported by this browser.',
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
  };

  // Trigger to load Google Maps script only once and get user's location on mount
  useEffect(() => {
    loadGoogleMapsScript();
    if (!cachedMap) {
      getUserLocation();
    }

    return () => {
      // Prevent map from being destroyed on unmount
      cachedMap = mapRef.current;
    };
  }, []);

  // Function to handle the map load event and cache the instance
  const handleMapLoad = (map) => {
    if (cachedMap) {
      mapRef.current = cachedMap;
    } else {
      mapRef.current = map;
      cachedMap = map; // Cache the map instance globally
    }
  };

  const locations = [
    { id: 1, lat: 25.022, lng: 121.56 },
    { id: 2, lat: 25.037671, lng: 121.540 },
    { id: 3, lat: 25.032671, lng: 121.562427 },
  ];

  return (
    <div className="w-full h-full border-[2px] border-[#330c0c]">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords}
          zoom={14}
          onLoad={handleMapLoad}
        >
          {/* Add markers or other map elements here */}
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </div>
  );
};

export default HomePage;
