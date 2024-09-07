'use client'
import BannerSection from './bannerSection';
import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
const tinderType = [
    {
        type: "art",
        icon: <img src='/resource/icon for taipeicode/art.png' alt="art" style={{ height: '80%', width: '80%' }} />
    },
    {
        type: "child",
        icon: <img src='/resource/icon for taipeicode/child.png' alt="art" style={{ height: '80%', width: '80%' }} />
    },
    {
        type: "couple",
        icon: <img src='/resource/icon for taipeicode/couple.png' alt="art" style={{ height: '80%', width: '80%' }} />
    }
]

const Home = () => {

    const router = useRouter();

    return (
        <div className="justify-center items-center h-full w-full relative">
            <div className='h-[10%] bg-[#555555]'>
                top
            </div>
            <div className="w-full h-[14%] flex row justify-around items-center bg-[#eeeeee]">
                {
                    tinderType.map(each => {
                        return (
                            <div
                                className='w-[30%] h-full flex justify-center items-center flex-col'
                                onClick={() => router.push(`/${each.type}`)}
                                key={each.type}
                            >
                                {
                                    each.icon
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full h-[3%] flex row justify-around items-center bg-[#eeeeee]">
                {
                    tinderType.map(each => {
                        return (
                            <div
                                className='w-[30%] h-full flex justify-center items-center flex-col'
                                onClick={() => router.push(`/${each.type}`)}
                                key={each.type}
                            >
                                {
                                    each.type
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="h-[73%]">
                <BannerSection />
            </div>
        </div>
    )
}

export default Home;