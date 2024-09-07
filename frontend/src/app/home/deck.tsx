'use client'
import Card from '../card/card'
import users from '../../../public/resource/homeData/users.json'
import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

const to = () => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1
})
const from = () => ({
    x: 0,
    y: 0,
    rot: 0,
    scale: 1
})

const trans = (r: number, s: number) =>
    `perspective(1500px) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const Deck = ({ setChoiceRate, choices, setChoices, currCardIndex, setCurrCardIndex }:
    {
        setChoiceRate: Dispatch<SetStateAction<number>>,
        choices: Array<'like' | 'dislike' | 'none'>,
        setChoices: Dispatch<SetStateAction<Array<'like' | 'dislike' | 'none'>>>,
        currCardIndex: number,
        setCurrCardIndex: Dispatch<SetStateAction<number>>
    }) => {

    const [gone, setGone] = useState<Set<number>>(() => new Set())

    const [clickPositionY, setClickPositionY] = useState<number>(0);
    const animatedDivRef = useRef<HTMLDivElement>(null);
    const [rotateDirection, setRotateDirection] = useState<number>(1);

    const handleClick = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        // console.log('touch screen')
        // Get the position of the interaction relative to the viewport
        const interactionY = event.type === 'touchstart' ?
            (event as React.TouchEvent<HTMLDivElement>).touches[0].clientY
            : (event as React.MouseEvent<HTMLDivElement>).clientY;

        // Get the position of the div relative to the viewport
        const divRect = animatedDivRef.current?.getBoundingClientRect();
        const divCenterY = divRect ? divRect.height / 2 : 0;

        // Calculate the interaction position relative to the center of the div
        const interactionRelativeY = divRect ? interactionY - divRect.top - divCenterY : 0;

        // Update state with the interaction position
        setClickPositionY(interactionRelativeY);
    };

    useEffect(() => {
        // console.log('clickPositionY', clickPositionY)
        if (clickPositionY > 0) setRotateDirection(-1);
        else setRotateDirection(1);
    }, [clickPositionY])

    const [props, api] = useSprings(users.length, i => ({
        ...to(),
        from: from(),
    }))


    /*------------------------------------------- user clicking buttons animation -------------------------------------------*/
    // handleCardSwipe will be called when chioces have been updated
    // which is updated when user clicks the buttons (in choicebar.tsx)
    useEffect(() => {
        handleCardSwipe();
    }, [choices])

    const handleCardSwipe = (): void => {
        api.start(i => {
            let x = 0, y = 0, rot = 0;
            if (i < currCardIndex) return {
                x: 0,
                y: 0,
                rot: 0,
                scale: 0.98,
                delay: undefined,
                config: { friction: 50, tension: 200 },
            }

            if (choices[i] === 'like') x = 2 * window.innerWidth;
            else if (choices[i] === 'dislike') x = -2 * window.innerWidth;
            else x = 0;

            y = 0;
            rot = x / 30;

            return {
                x,
                y,
                rot,
                scale: 1,
                delay: undefined,
                config: { friction: 50, tension: 200 },
            }

        })
    };

    /*----------------------------------------------- user dragging animation -----------------------------------------------*/
    // useDrag will only be called when user is trying to drag something
    const bind = useDrag(({ args: [index], down, movement }) => {
        const triggerDistance = window.innerWidth / 3;
        const trigger = (Math.abs(movement[0]) >= triggerDistance);

        setCurrCardIndex(index);

        if (!down && trigger) {
            setGone(prev => {
                const newArray = Array.from(prev); // Convert the existing Set to an array
                newArray.push(index); // Add the new index to the array
                return new Set<number>(newArray); // Create a new Set from the updated array
            });
        }

        api.start(i => {
            if (index !== i) return

            // only the top card can be dragged
            let isGone = gone.has(index)
            // console.log(i, dragging)

            let x = 0, y = 0;
            if (isGone) {
                x = 2 * window.innerWidth * movement[0] / Math.abs(movement[0])
                y = 0;
            } else {
                if (down) {
                    x = movement[0];
                    y = movement[1];
                } else {
                    if (choices[i] === 'like') x = 2 * window.innerWidth;
                    else if (choices[i] === 'dislike') x = -2 * window.innerWidth;
                    else x = 0;
                    y = 0;
                }
            }

            let rot = x / 30 * rotateDirection
            let scale = 1;

            if (!down && trigger) {
                x = 2 * window.innerWidth * movement[0] / Math.abs(movement[0]);
                y = 0;

                let newChoices = [...choices];
                if (x > 0) newChoices[i] = 'like';
                if (x < 0) newChoices[i] = 'dislike';
                if (x === 0) newChoices[i] = 'none';
                setChoices(newChoices);
            }

            if (x >= 2 * window.innerWidth || x <= -2 * window.innerWidth) setCurrCardIndex(index - 1);
            setChoiceRate(x / triggerDistance);

            return {
                x,
                y,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
            }
        })
    })

    return (
        <div className='w-full h-full will-change-transform flex items-center justify-center touch-none'>
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className='w-full h-full absolute flex will-change-transform items-center justify-center touch-none'
                    style={{
                        x, y,
                        transform: interpolate([rot, scale], trans)
                    }}
                    {...bind(i)}
                    key={i}
                    ref={animatedDivRef}
                    onMouseDown={handleClick}
                    onTouchStart={handleClick}
                >
                    <Card name={users[i].name} description={users[i].description} imgUrl={users[i].imgUrl} />
                </animated.div>
            ))}
        </div>
    )
}

export default Deck;