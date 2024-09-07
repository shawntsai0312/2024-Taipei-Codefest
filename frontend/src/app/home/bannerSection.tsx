// components/BannerSection.tsx
import React from 'react';
import Banner from './banner';

const BannerSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8" style={{padding: '5%'}}>
      <Banner description="Banner 1: Beautiful Scenery" images={['/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg']} />
      <Banner description="Banner 2: Travel Adventures" images={['/resource/homeData/img/1.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/3.jpeg']} />
      <Banner description="Banner 3: Amazing Destinations" images={['/resource/homeData/img/1.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/3.jpeg']} />
    </div>
  );
};

export default BannerSection;
