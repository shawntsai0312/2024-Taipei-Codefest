'use client'
import BannerSection from './bannerSection';
import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import MuseumIcon from '@mui/icons-material/Museum';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WcIcon from '@mui/icons-material/Wc';
const tinderType = [
    {
        type: "art",
        icon: <MuseumIcon sx={{ height: '80%', width: '100%' }} />
    },
    {
        type: "child",
        icon: <FamilyRestroomIcon sx={{ height: '80%', width: '100%' }} />
    },
    {
        type: "couple",
        icon: <WcIcon sx={{ height: '80%', width: '100%' }} />
    }
]

const Home = () => {

    const router = useRouter();

    return (
        <div className="justify-center items-center h-full w-full relative">
            <div className='h-[10%] bg-[#555555]'>
                top
            </div>
            <div className="w-full h-[17%] flex row justify-around items-center bg-[#eeeeee]">
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