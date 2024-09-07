'use client'
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
        <div className="w-full h-[17%] flex row justify-around items-center">
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
    )
}

export default Home;