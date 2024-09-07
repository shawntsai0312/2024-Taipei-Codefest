'use client'
import { useState, useRef } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/material/Stack';
import Image from 'next/image';

interface CardProps {
    name: string;
    description: string[];
    imgUrl: string;
}

const UserCard = ({ name, description, imgUrl }: CardProps) => {
    const [descriptionIndex, setDescriptionIndex] = useState<number>(0);

    const cardRef = useRef<HTMLDivElement>(null);

    const handleClick = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        const interactionX = event.type === 'touchstart' ?
            (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX
            : (event as React.MouseEvent<HTMLDivElement>).clientX;

        // const interactionY = event.type === 'touchstart' ?
        //     (event as React.TouchEvent<HTMLDivElement>).touches[0].clientY
        //     : (event as React.MouseEvent<HTMLDivElement>).clientY;

        // Get the position of the div relative to the viewport
        const divRect = cardRef.current?.getBoundingClientRect();
        const divCenterX = divRect ? divRect.width / 2 : 0;
        // const divCenterY = divRect ? divRect.height / 2 : 0;

        // Calculate the interaction position relative to the center of the div
        const interactionRelativeX = divRect ? interactionX - divRect.top - divCenterX : 0;
        // const interactionRelativeY = divRect ? interactionY - divRect.top - divCenterY : 0;

        // Update state with the interaction positio

        if (interactionRelativeX > 0) {
            if (descriptionIndex < description.length - 1) setDescriptionIndex(descriptionIndex + 1)
        }
        if (interactionRelativeX < 0) {
            if (descriptionIndex > 0) setDescriptionIndex(descriptionIndex - 1)
        }
    };

    return (

        <Card ref={cardRef} sx={{ height: '100%', width: '97.5%' }} onClick={handleClick}>
            <CardCover>
                <Image
                    src={imgUrl}
                    width={600}
                    height={600}
                    loading="lazy"
                    alt=""
                />
                <div className='absolute z-10 w-full top-[5px] h-[3px] pl-[5px] pr-[5px] items-center bg-transparent flex flex-row justify-around'>
                    {description.map((item, index) => (
                        <div className={`h-[4px] m-[3px] rounded-full ${index === descriptionIndex ? 'bg-slate-50' : 'bg-gray-600'}`} key={index} style={{ width: `${100 / description.length}%` }} />
                    ))}
                </div>
            </CardCover>
            <CardCover
                sx={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 400px), linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0) 400px)',
                }}
            />
            <CardContent sx={{ justifyContent: 'flex-end', position: 'absolute', bottom: '100px', width: '93%' }}>
                <Stack spacing={30} direction="row" sx={{ width: '100%' }}>
                    <Typography level="h2" textColor="#fff">
                        {name}
                    </Typography>
                </Stack>
                <Typography textColor="neutral.300">
                    {description[descriptionIndex]}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default UserCard;