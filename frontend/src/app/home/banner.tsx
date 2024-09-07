import React, { useRef, useEffect, useState } from 'react';
import _ from 'lodash';

interface BannerProps {
  description: string;
  images: string[];
}

const Banner: React.FC<BannerProps> = ({ description, images }) => {
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
          const nextIndex = (prevIndex + 1) % images.length;
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
  }, [images.length, imageWidth, w, isInteracting]);

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

  return (
    <div className="flex flex-col w-full">
      <p className="mb-2 text-lg font-bold" style={{paddingLeft: '10%'}}>{description}</p>
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
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`banner-${index}`}
                className="object-cover rounded-lg shadow-lg flex-shrink-0"
                style={{ 
                  width: imageWidth, 
                  height: imageHeight, 
                  marginLeft: `${index === 0 ? 0.1 * w : 0.02 * w}px`,
                  marginRight: `${index === images.length - 1 ? 0.1 * w : 0.02 * w}px`
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar (Dots) */}
        <div className="flex mt-2 space-x-2">
          {images.map((_, index) => (
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
