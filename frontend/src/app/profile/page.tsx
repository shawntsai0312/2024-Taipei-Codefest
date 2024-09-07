'use client'

import { useRouter } from 'next/navigation';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MuseumIcon from '@mui/icons-material/Museum';
import WcIcon from '@mui/icons-material/Wc';
import StarsIcon from '@mui/icons-material/Stars';

const tinderType = [
    {
        type: "藝文活動",
        icon: <MuseumIcon sx={{ height: '25%', width: '15%' }} />,
        URL: 'https://www.travel.taipei/image/63823/?r=1498534408621'
    },
    {
        type: "親子活動",
        icon: <FamilyRestroomIcon sx={{ height: '25%', width: '15%' }} />,
        URL: 'https://www.travel.taipei/image/63823/?r=1498534408621'
    },
    {
        type: "情侶活動",
        icon: <WcIcon sx={{ height: '25%', width: '15%' }} />,
        URL: 'https://www.travel.taipei/image/63823/?r=1498534408621'
    }
]

const Profile = () => {
    const router = useRouter();

    return (
        <div className="h-full w-full flex flex-col my-10">
            <div className="h-[7%] w-full text-[28px] flex items-center font-bold text-taipeiPass mx-4">
                <StarsIcon sx={{ height: '60%', width: '15%' }} />
                <p>
                    我的收藏
                </p>
            </div>

            {/* 主內容區塊 */}
            <div className="left-[-50%] h-[60%] w-[100%] flex flex-col items-center justify-around">
                {
                    tinderType.map(each => {
                        return (
                            <div
                                className="relative w-[84%] h-[30%] text-[32px] rounded-3xl font-semibold bg-white flex items-center justify-center text-taipeiPass border-4 border-taipeiPass z-20"
                                onClick={() => router.push(`/profile/${each.type}`)}
                            >
                                {/* 左邊梯形圖片區塊 */}
                                <div
                                    className="absolute w-[100%] h-full flex items-center justify-start z-10 rounded-l-3xl border-1 "
                                    style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}  // 梯形
                                >
                                    <img
                                        className="rounded-l-3xl"
                                        src={each.URL}
                                        width={300}
                                        height={300}
                                        loading="lazy"
                                        alt=""
                                    />
                                </div>

                                {/* 右邊梯形文字區塊 */}
                                <div
                                    className="absolute w-[100%] text-[32px] h-full flex items-center justify-end p-5 box-border text-taipeiPass text-right rounded-3xl "
                                    style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }} // 梯形
                                >
                                    {each.type}
                                </div>
                            </div>
                        )
                    })
                }

                {/* 新增一個梯形範例區塊 */}
                {/* 新增一個重疊梯形範例區塊 */}
                {/* <div className="relative w-[84%] h-[25%] my-4 border-2 border-taipeiPass rounded-3xl overflow-hidden">
                    {/* 左邊梯形圖片區塊 */}
                {/* <div className="absolute w-[100%] h-full bg-gray-200 flex items-center justify-center" */}
                {/* style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}>  左側梯形 */}
                {/* <img src="your-image-url.jpg" alt="Example Image" className="w-full h-full object-cover rounded-l-3xl" /> */}
                {/* </div> */}

                {/* 右邊梯形文字區塊 */}
                {/* <div className="absolute w-[100%] h-full bg-white p-5 flex items-center justify-center text-taipeiPass text-[32px] font-semibold rounded-r-3xl" */}
                {/* // style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }}>  右側梯形 */}
                {/* {} */}
                {/* </div>  */}
                {/* </div> */}


            </div>
        </div >
    )
}

export default Profile;
