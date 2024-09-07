// components/BannerSection.tsx
import React from 'react';
import Banner from './banner';

const BannerSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 space-y-2" style={{paddingBottom: '5%', paddingTop: '5%'}}>
      <Banner description="藝文活動" images={['/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/2.jpeg']} />
      <Banner description="親子活動" images={['/resource/homeData/img/1.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/3.jpeg']} />
      <Banner description="伴侶活動" images={['/resource/homeData/img/1.jpeg', '/resource/homeData/img/2.jpeg', '/resource/homeData/img/3.jpeg']} />
    </div>
  );
};

export default BannerSection;
