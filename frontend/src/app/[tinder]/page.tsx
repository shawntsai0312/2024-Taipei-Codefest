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
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
        <div className="w-full h-full justify-center items-center overflow-y overflow-x-hidden relative">
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
        </div>
    )
}

export default Tinder;