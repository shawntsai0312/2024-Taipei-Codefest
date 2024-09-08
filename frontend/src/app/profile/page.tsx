'use client'

import { useRouter } from 'next/navigation';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MuseumIcon from '@mui/icons-material/Museum';
import WcIcon from '@mui/icons-material/Wc';
import StarsIcon from '@mui/icons-material/Stars';

const tinderType = [
    {
        type: "art",
        name: "藝文活動",
        icon: <MuseumIcon sx={{ height: '25%', width: '15%' }} />,
        URL: 'https://image-cdn.learnin.tw/bnextmedia/image/album/2020-02/img-1581058259-35281.jpg?w=1600&output=webp'
    },
    {
        type: "child",
        name: "親子活動",
        icon: <FamilyRestroomIcon sx={{ height: '25%', width: '15%' }} />,
        URL: 'https://yas.io/hk/blog/wp-content/uploads/2020/08/AdobeStock_318148342-min.jpeg'
    },
    {
        type: "couple",
        name: "情侶約會",
        icon: <WcIcon sx={{ height: '25%', width: '15%' }} />,
        URL: 'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-02/outdoor-date-ideas-hiking-mc-240213-e0c84e.jpg'
    }
]

const Profile = () => {
    const router = useRouter();

    return (
        <div className="h-full w-full flex flex-col pt-4">
            <div className="h-[7%] w-full text-xl ml-4 flex items-center font-bold text-taipeiPass">
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
                                className="relative w-[84%] h-[30%] text-[32px] rounded-3xl font-semibold bg-white flex items-center justify-center text-taipeiPass border-2 border-taipeiPass z-20 overflow-hidden shadow-lg"
                                onClick={() => router.push(`/profile/${each.type}`)}
                                key={each.type}
                            >
                                {/* 左邊梯形圖片區塊 */}
                                <div
                                    className="absolute w-[100%] h-[110%] flex items-center justify-start z-10"
                                    style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}  // 梯形
                                >
                                    <img
                                        className="rounded-l-3xl -ml-14 mt-2"
                                        src={each.URL}
                                        width={300}
                                        height={300}
                                        loading="lazy"
                                        alt=""
                                    />
                                </div>

                                {/* 右邊梯形文字區塊 */}
                                <div
                                    className="absolute w-[100%] text-xl h-full flex items-center justify-end p-5 box-border text-taipeiPass text-right rounded-3xl "
                                    style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }} // 梯形
                                >
                                    {each.name}
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
