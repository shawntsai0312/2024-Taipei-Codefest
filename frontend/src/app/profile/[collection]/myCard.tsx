'use client'
import Card from '../card/card'
import { useEffect, useState, useRef } from 'react';
import { useSpring, animated, to as interpolate } from '@react-spring/web'
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

interface MyCardProps {
    name: string;
    description: string[];
    imgUrl: string;
    closeModal: () => void;
}

const MyCard = ({ name, description, imgUrl, closeModal }: MyCardProps) => {

    const animatedDivRef = useRef<HTMLDivElement>(null);
    const [clickPositionY, setClickPositionY] = useState<number>(0);
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

    const [props, api] = useSpring(() => ({
        ...to(),
        from: from(),
    }), [])

    const bind = useDrag(({ down, movement }) => {
        const triggerDistance = window.innerWidth / 3;
        const trigger = (Math.abs(movement[0]) >= triggerDistance);

        api.start(() => {

            let x = 0, y = 0;

            if (down) {
                x = movement[0];
                y = movement[1];
            } else {
                if (trigger) x = 2 * window.innerWidth * movement[0] / Math.abs(movement[0]);
                else x = 0;
                y = 0;
            }

            let rot = x / 30 * rotateDirection
            let scale = 1;

            if (!down && trigger) {
                x = 2.1 * window.innerWidth * movement[0] / Math.abs(movement[0]);
                y = 0;
            }

            if (x >= 2 * window.innerWidth || x <= -2 * window.innerWidth) closeModal();

            return {
                x,
                y,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : 500 },
            }
        })
    })

    return (
        <div className='w-[95%] h-[80%] will-change-transform flex items-center justify-center touch-none  border-none outline-none'>
            <animated.div className='w-full h-full absolute flex will-change-transform items-center justify-center touch-none'
                style={{
                    x: props.x,
                    y: props.y,
                    transform: interpolate([props.rot, props.scale], trans)
                }}
                {...bind()}
                ref={animatedDivRef}
                onMouseDown={handleClick}
                onTouchStart={handleClick}
            >
                <Card name={name} description={description} imgUrl={imgUrl} />
            </animated.div>

        </div>
    )
}

export default MyCard;