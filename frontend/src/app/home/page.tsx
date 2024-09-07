'use client'
import Choicebar from "./choicebar";
import { useEffect, useState } from 'react';
import Deck from './deck';
import users from '../../../public/resource/homeData/users.json'

const Home = () => {
    const [currCardIndex, setCurrCardIndex] = useState<number>(users.length - 1);
    const [choiceRate, setChoiceRate] = useState<number>(0);
    const [choices, setChoices] = useState<Array<'like' | 'dislike' | 'none'>>(new Array(users.length).fill('none'));

    useEffect(() => {
        if (choiceRate >= 5.5 || choiceRate <= -5.5) setChoiceRate(0)
    }, [choiceRate])

    useEffect(() => {
        // console.log(currCardIndex)
    }, [currCardIndex])

    return (
        <div className="justify-center items-center h-full w-full overflow-y relative">
            <Deck setChoiceRate={setChoiceRate}
                choices={choices} setChoices={setChoices}
                currCardIndex={currCardIndex} setCurrCardIndex={setCurrCardIndex}
            />
            <div className="w-full h-[44px] fixed flex justify-center bottom-[90px] z-30">
                <Choicebar choiceRate={choiceRate} setChoiceRate={setChoiceRate}
                    currCardIndex={currCardIndex} setCurrCardIndex={setCurrCardIndex}
                    choices={choices} setChoices={setChoices}
                />
            </div>
        </div>
    )
}

export default Home;