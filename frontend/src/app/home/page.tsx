'use client'
import BannerSection from './bannerSection';
import * as React from 'react';
import { useRouter } from 'next/navigation';

const tinderType = [
    {
        type: "art",
        title: '藝文活動',
        icon: <img src='/resource/icon for taipeicode/art.png' alt="art" style={{ height: '40px', width: '40px' }} />
    },
    {
        type: "child",
        title: '親子活動',
        icon: <img src='/resource/icon for taipeicode/child.png' alt="art" style={{ height: '40px', width: '40px' }} />
    },
    {
        type: "couple",
        title: '情侶約會',
        icon: <img src='/resource/icon for taipeicode/couple.png' alt="art" style={{ height: '40px', width: '40px' }} />
    }
]

const Home = () => {
    const router = useRouter();

    return (
        <div className="justify-center items-center h-full w-full relative">
            <div className="w-full h-[10%] mt-2 flex row items-center bg-[#ffffff] justify-center space-x-2">
                {
                    tinderType.map(each => {
                        return (
                            <div
                                className='w-[30%] h-full flex justify-center items-center flex-col'
                                onClick={() => router.push(`/${each.type}`)}
                                key={each.type}
                            >
                                <div className="w-[100%] text-xs h-16 bg-[#ffffff] rounded-lg flex justify-center items-center flex-col shadow-lg outline outline-[#DBF1F5]">
                                    {each.icon}
                                    {each.title}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="h-[90%]">
                <BannerSection />
            </div>
        </div>
    )
}

export default Home;
