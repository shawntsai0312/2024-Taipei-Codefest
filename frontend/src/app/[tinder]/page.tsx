'use client'
import Choicebar from "./choicebar";
import axios from 'axios'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Deck from './deck';

interface Place {
    name: string;
    description: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    id: number;
    imgUrl: string[];
    price: string;
    time: string;
    rating: number;
}

const Tinder = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [jsonData, setJsonData] = useState<Place[] | null>(null);
    const [classId, setClassId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://127.0.0.1:5000/api/generate_banner`
                const response = await axios.get(url)

                if (response.status === 200) {
                    console.log(response.data)
                    if (response.data) {
                        if (pathname === '/art') setJsonData(response.data[0])
                        if (pathname === '/child') setJsonData(response.data[1])
                        if (pathname === '/couple') setJsonData(response.data[2])
                        setLoading(false); // Data is loaded
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Data is loaded
            }
        };
        fetchData();
        if (pathname === '/art') setClassId(1)
        if (pathname === '/child') setClassId(2)
        if (pathname === '/couple') setClassId(3)
    }, [pathname])

    const [currCardIndex, setCurrCardIndex] = useState<number>(jsonData ? jsonData.length - 1 : 0);
    const [choiceRate, setChoiceRate] = useState<number>(0);
    const [choices, setChoices] = useState<Array<'like' | 'dislike' | 'none'>>(jsonData ? new Array(jsonData.length).fill('none') : []);

    useEffect(() => {
        setCurrCardIndex(jsonData ? jsonData.length - 1 : 0);
    }, [jsonData])

    useEffect(() => {
        if (choiceRate >= 5.5 || choiceRate <= -5.5) setChoiceRate(0)
    }, [choiceRate])

    useEffect(() => {
        console.log(currCardIndex)
        if (currCardIndex < 0) router.push(`profile${pathname}`)
    }, [currCardIndex])

    useEffect(() => {
        console.log(choices)    
        console.log(classId)
        console.log(currCardIndex+1)
        console.log(choices[currCardIndex+1])
        const fetchData = async () => {
            try {
                const url = `http://127.0.0.1:5000/api/${classId}/${currCardIndex+1}/${choices[currCardIndex+1]}/update_data`
                const response = await axios.get(url)

                if (response.status === 200) {
                    console.log(response.data)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [choices])

    return (
        <div className="w-full h-full justify-center items-center overflow-y relative">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-[#CAD1D5] fill-[#5AB4C5]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            ) : (
                <>
                    <Deck setChoiceRate={setChoiceRate}
                        choices={choices} setChoices={setChoices}
                        currCardIndex={currCardIndex} setCurrCardIndex={setCurrCardIndex}
                        jsonData={jsonData}
                    />
                    <div className="w-full h-[44px] fixed flex justify-center bottom-[90px] z-30">
                        {
                            currCardIndex >= 0 ?
                                <Choicebar choiceRate={choiceRate} setChoiceRate={setChoiceRate}
                                    currCardIndex={currCardIndex} setCurrCardIndex={setCurrCardIndex}
                                    choices={choices} setChoices={setChoices}
                                /> : <></>
                        }

                    </div>
                </>
            )}
        </div>
    )
}

export default Tinder;