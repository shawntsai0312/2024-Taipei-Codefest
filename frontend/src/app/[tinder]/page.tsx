'use client'
import Choicebar from "./choicebar";
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
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
    const [jsonData, setJsonData] = useState<Place[] | null>(null);

    useEffect(() => {
        console.log(pathname);
        const loadJsonData = async () => {
            try {
                // Dynamically import JSON file based on condition
                const loadedJsonData = await import(`../../../public/data${pathname}.json`);
                setJsonData(loadedJsonData.default);
            } catch (error) {
                console.error('Error loading JSON data:', error);
            }
        };

        loadJsonData();
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
    }, [currCardIndex])

    useEffect(() => {
        console.log(choices)
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