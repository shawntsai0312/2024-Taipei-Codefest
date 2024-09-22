import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import Swal from 'sweetalert2';
import axios from 'axios'
import { usePathname, useRouter } from "next/navigation";
import StarsIcon from '@mui/icons-material/Stars';
import 'dotenv/config';


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
  const [curCoord, setCurCoord] = useState(null);
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
      console.log('Google Maps API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`; // 
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
          setCurCoord(userLocation);
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
    }
  }

  return (
    <div className="w-full h-[94vh]">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coords}
          zoom={14}
          onLoad={handleMapLoad}
        >
          {curCoord && <MarkerF
              key={location.id}
              position={curCoord}
            />}
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
          {/* <div className='bg-[#eeeeee] w-[240px] h-[36px] mx-auto z-[]'>
            <button className='w-[24px]'>全部</button>
            <button className='h-[18px]'>收藏</button>
          </div> */}
        </GoogleMap>
      ) : (
        <div className="flex justify-center items-center h-full">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-[#CAD1D5] fill-[#5AB4C5]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
      )}
    </div>
  );
};

export default HomePage;
