'use client'
import BannerSection from './bannerSection';
import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
const tinderType = [
    {
        "type": "art"
    },
    {
        "type": "child"
    },
    {
        "type": "couple"
    }
]

const Home = () => {

    const router = useRouter();
    
    return (
// <<<<<<< HEAD
//         <div className="justify-center items-center h-full w-full relative">
//             <div className="h-[10%]" color="blue">
//                 top
//             </div>
//             <div className="h-[17%]" color="red">
//                 top
//             </div>
//             <div className="h-[83%]">
//                 <BannerSection />
//             </div>
//             {/* <Deck setChoiceRate={setChoiceRate}
//                 choices={choices} setChoices={setChoices}
//                 currCardIndex={currCardIndex} setCurrCardIndex={setCurrCardIndex}
//             />
//             <div className="w-full h-[44px] fixed flex justify-center bottom-[90px] z-30">
//                 <Choicebar choiceRate={choiceRate} setChoiceRate={setChoiceRate}
//                     currCardIndex={currCardIndex} setCurrCardIndex={setCurrCardIndex}
//                     choices={choices} setChoices={setChoices}
//                 />
//             </div> */}
// =======
        <div className="justify-center items-center h-full w-full relative">
            <div className='h-[10%] bg-[#555555]'>
                top
            </div>
            <div className="w-full h-[17%] flex row justify-around items-center bg-[#eeeeee]">
                {
                    tinderType.map(each => {
                        return (
                            <div
                                className='w-[30%] h-full flex justify-center items-center'
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
                <BannerSection/>
            </div>
        </div>
    )
}

export default Home;