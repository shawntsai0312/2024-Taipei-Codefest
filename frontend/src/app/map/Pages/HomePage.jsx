import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import Swal from 'sweetalert2';
import axios from 'axios'
import { usePathname, useRouter } from "next/navigation";
import StarsIcon from '@mui/icons-material/Stars';


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
  const [locations, setLocations] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const mapRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const modalRef = useRef(null);
  const [curAttraction, setCurAttraction] = useState({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current  && modalRef.current === event.target) {
        setIsModalOpen(false);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };

    if (isModalOpen) document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Function to load Google Maps API asynchronously
  const loadGoogleMapsScript = () => {
    if (!scriptLoaded && !document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoaded(true);
        scriptLoaded = true; 
      };
      document.head.appendChild(script);
    } else if (scriptLoaded) {
      setIsLoaded(true); 
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoords(userLocation); 
          mapRef.current?.setCenter(userLocation); 
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

  useEffect(() => {
    loadGoogleMapsScript();
    if (!cachedMap) {
      getUserLocation();
    }

    return () => {
      cachedMap = mapRef.current;
    };
  }, []);

  const handleMapLoad = (map) => {
    if (cachedMap) {
      mapRef.current = cachedMap;
    } else {
      mapRef.current = map;
      cachedMap = map; 
    }
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const url = `http://127.0.0.1:5000/api/generate_banner`
              const response = await axios.get(url)
              if (response.status === 200) {
                  console.log(response.data.flat())
                  setLocations(response.data.flat())
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, [pathname])

  const showInfo = (location) => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      setCurAttraction(location)
      setCoords({ lat: location.coordinates.latitude, lng: location.coordinates.longitude})
    }
    console.log(isModalOpen)
  }

  return (
    <div className="w-full h-full border-[2px] border-[#330c0c]">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords}
          zoom={14}
          onLoad={handleMapLoad}
        >
          <MarkerF
              key={location.id}
              position={coords}
            />
          {/* Add markers or other map elements here */}
          {locations.map(location => (
            <MarkerF
              onClick={() => showInfo(location)}
              position={{ lat: location.coordinates.latitude, lng: location.coordinates.longitude}}
              options={{
                icon: {
                  path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                   fillColor: `${location.preference === 'like' ? "#73BF00" : "#BEBEBE"}` ,
                  fillOpacity: 1,
                  scale: 2,
                },
              }}
            />
          ))}
          
          {isModalOpen && <div ref={modalRef} className='fixed flex justify-center items-center text-[16px] top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] z-[70]'>
            <div className='min-w-[288px] min-h-[196px] mx-auto bg-[#efefef] border-[2px] border-[#d1d1d1] flex flex-col'>
              <div className='mx-auto mt-[12px]'>
                <img
                  className="rounded-xl"
                  src={curAttraction.imgUrl[0]}
                  width={200}
                  height={170}
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className='flex justify-around items-center mt-[12px]'>
                <p>{curAttraction.name}</p>
                <div className='flex'>
                    <img
                      className=""
                      src={StarsIcon}
                      alt=""
                    />
                    <p>{curAttraction.rating}</p>
                </div>
              </div>
              
            </div>
          </div> }
          <div className='bg-[#eeeeee] w-[240px] h-[36px] mx-auto z-[]'>
            <button className='w-[24px]'>全部</button>
            <button className='h-[18px]'>收藏</button>
          </div>
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}
    </div>
  );
};

export default HomePage;
