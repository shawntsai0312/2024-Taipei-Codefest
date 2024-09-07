import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import Swal from 'sweetalert2';
import pinIcon from '../Assets/Pin.svg';

const containerStyle = {
  width: '100%',
  height: '88vh',
};

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
    if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${'AIzaSyAZsmXSzyeIXkdMQCNUpAyzb3OBIh0vm6w'}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true); // Set isLoaded to true when API is loaded
      document.head.appendChild(script);
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

  // Trigger the function to get the user's location and load Google Maps when the component mounts
  useEffect(() => {
    loadGoogleMapsScript();
    getUserLocation();
  }, []);
  

  const locations = [
    { id: 1, lat: 25.022, lng: 121.56 },
    { id: 2, lat: 25.037671, lng: 121.540 },
    { id: 3, lat: 25.032671, lng: 121.562427 },
  ];

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const map = mapRef.current;

      // Create a custom marker for the user's location
      const userMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: coords,
        title: 'Your Location',
        icon: {
          url: pinIcon, // Ensure this file is in your public folder
          size: new google.maps.Size(50, 35), // Set the size of the custom icon
          anchor: new google.maps.Point(15, 15),
        },
      });

      // Add markers for each location
      locations.forEach((location) => {
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: location.lat, lng: location.lng },
          title: `Location ${location.id}`,
          icon: {
            url: pinIcon,
            size: new google.maps.Size(50, 35),
            anchor: new google.maps.Point(15, 15),
          },
        });
      });
    }
  }, [isLoaded, coords]);

  return (
    <div className="w-full h-full border-[2px] border-[#330c0c]">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords}
          zoom={14}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Render the marker when the map is loaded */}
          <MarkerF
            position={coords}
            icon={{
              url: require('../Assets/CarIcon.svg').default,
              scaledSize: new window.google.maps.Size(50, 35), // Ensure that this is only called when the API is loaded
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
          {locations.map((location) => (
            <MarkerF
              key={location.id} // Add a unique key for each marker
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: pinIcon, // Custom icon (optional)
                scaledSize: new window.google.maps.Size(50, 35), // Adjust icon size
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
            />
          ))}
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </div>
  );
};

export default HomePage;
