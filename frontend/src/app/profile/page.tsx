'use client'

import { useRouter } from 'next/navigation';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MuseumIcon from '@mui/icons-material/Museum';
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

const Profile = () => {
    const router = useRouter();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="h-[7%] w-full text-[28px] flex font-bold text-taipeiPass">
                <p className="px-8">
                    我的口袋名單
                </p>
            </div>
            <div className="left-[-50%] h-[80%] w-[100%] 
                flex flex-col items-center justify-around"
            >
                {
                    tinderType.map(each => {
                        return (
                            <div
                                className="w-[84%] h-[25%] text-[34px] rounded-3xl font-semibold bg-taipeiPass flex items-center justify-center"
                                onClick={() => router.push(`/profile/${each.type}`)}
                            >
                                {
                                    each.type
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;