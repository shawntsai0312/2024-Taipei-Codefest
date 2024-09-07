import React, { useRef, useEffect, useState } from 'react';
import _ from 'lodash';

interface BannerProps {
  description: number;
  places: Place[]; // Updated to use Place array
}

interface Place {
    name: string;
    description: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    id: number;
    class_id: number;
    imgUrl: string[]; // This is an array of image URLs
    price: string;
    time: string;
    rating: number;
}

const Banner: React.FC<BannerProps> = ({ description, places }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const w = window.innerWidth;
  const h = window.innerHeight;

  const [imageWidth, setImageWidth] = useState<number>(w * 0.8);
  const [imageHeight, setImageHeight] = useState<number>(h * 0.25);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setImageWidth(w * 0.8);
      setImageHeight(h * 0.25);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [w, h]);

  // Debounced handleSnapScroll function
  const debouncedHandleSnapScroll = _.debounce(() => {
    if (scrollRef.current && !isInteracting) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const closestImageIndex = Math.round(scrollPosition / imageWidth);
      setCurrentImageIndex(closestImageIndex);

      window.requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          left: closestImageIndex * (imageWidth + w * 0.04),
          behavior: 'smooth',
        });
      });
    }
  }, 100);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (!isInteracting) {
      intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % places.length;
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              left: nextIndex * (imageWidth + w * 0.04),
              behavior: 'smooth',
            });
          }
          return nextIndex;
        });
      }, 5000); // Change image every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear interval on cleanup
      }
    };
  }, [places.length, imageWidth, w, isInteracting]);

  // UseEffect to trigger snapping after interaction ends
  useEffect(() => {
    if (!isInteracting) {
      debouncedHandleSnapScroll();
    }
  }, [isInteracting, debouncedHandleSnapScroll]);

  const handleTouchStart = () => setIsInteracting(true);

  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * (imageWidth + w * 0.04),
        behavior: 'smooth',
      });
    }
  };

  const handleImageClick = (place: Place) =>{
    console.log(place)
  }

  return (
    <div className="flex flex-col w-full">
      <div className='flex flex-row justify-between'>
        <p className="mb-2 text-lg font-bold" style={{paddingLeft: '10%'}}>
          {
            description === 1 ? '藝文活動' :
            description === 2 ? '親子活動' : '情侶約會'
          }
        </p>
        <div className='flex flex-row w-[20%]'>
          <p className='mt-2.5 text-xs' style={{paddingRight: '5%'}}>更多</p>
          <img src='/resource/homeData/img/arrow_forward.png' className='mt-3' style={{ height: '10px', width: '10px' }} />
        </div>
      </div>
      <div className='flex flex-col w-full items-center'>
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex w-full overflow-x-scroll scrollbar-hide scroll-smooth"
            onScrollCapture={() => {
              if (!isInteracting) {
                debouncedHandleSnapScroll();
              }
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {places.map((place, index) => (
              <img
                key={index}
                src={place.imgUrl[0]} // Assuming you want to display the first image of each place
                alt={`banner-${index}`}
                className="object-cover rounded-lg shadow-lg flex-shrink-0"
                // onMouseDown={handleImageClick(place)}
                style={{ 
                  width: imageWidth, 
                  height: imageHeight, 
                  marginLeft: `${index === 0 ? 0.1 * w : 0.02 * w}px`,
                  marginRight: `${index === places.length - 1 ? 0.1 * w : 0.02 * w}px`
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar (Dots) */}
        <div className="flex mt-2 space-x-2">
          {places.map((_, index) => (
            <div
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentImageIndex ? 'bg-[#5AB4C5]' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
