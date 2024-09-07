'use client'
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import MyCard from './myCard';
import SlotMachine from '@/app/slot/page';

const Collection = () => {
    const router = useRouter();

    const places = [
        {
            "name": "台北市立動物園",
            "description": "適合全家一起探索動物世界",
            "coordinates": {
                "latitude": 24.9985,
                "longitude": 121.5812
            },
            "id": 1,
            "imgUrl": [
                "https://www.travel.taipei/image/222131/?r=1637654105614",
                "https://www.travel.taipei/image/222131/?r=1637654105614"
            ],
            "price": "$",
            "time": "3-4小時",
            "rating": 4.5
        },
        {
            "name": "兒童新樂園",
            "description": "充滿遊樂設施的親子樂園",
            "coordinates": {
                "latitude": 25.0848,
                "longitude": 121.5154
            },
            "id": 2,
            "imgUrl": [
                "https://www.travel.taipei/image/222131/?r=1637654105614",
                "https://www.travel.taipei/image/222131/?r=1637654105614"
            ],
            "price": "$",
            "time": "半天",
            "rating": 4.4
        },
        {
            "name": "科教館",
            "description": "孩子探索科學的理想場所",
            "coordinates": {
                "latitude": 25.0953,
                "longitude": 121.5160
            },
            "id": 3,
            "imgUrl": [
                "https://www.travel.taipei/image/222131/?r=1637654105614",
                "https://www.travel.taipei/image/222131/?r=1637654105614"
            ],
            "price": "$",
            "time": "半天",
            "rating": 4.3
        },
        {
            "name": "士林官邸公園",
            "description": "親子遊玩放鬆的綠色園區",
            "coordinates": {
                "latitude": 25.0965,
                "longitude": 121.5269
            },
            "id": 4,
            "imgUrl": [
                "https://www.travel.taipei/image/222131/?r=1637654105614",
                "https://www.travel.taipei/image/222131/?r=1637654105614"
            ],
            "price": "$",
            "time": "半天",
            "rating": 4.4
        },
        {
            "name": "大佳河濱公園",
            "description": "騎車、放風箏，親子共樂",
            "coordinates": {
                "latitude": 25.0706,
                "longitude": 121.5324
            },
            "id": 5,
            "imgUrl": [
                "https://www.travel.taipei/image/222131/?r=1637654105614",
                "https://www.travel.taipei/image/222131/?r=1637654105614"
            ],
            "price": "免費",
            "time": "2-3小時",
            "rating": 4.5
        }
    ];

    const handleBackToProfile = () => {
        router.push('/profile');
    };

    const [cardOpen, setCardOpen] = useState(false);
    const handleCardOpen = () => setCardOpen(true);
    const handleCardClose = () => setCardOpen(false);

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="h-[10%] w-full text-[28px] flex items-center font-bold text-taipeiPass px-4">
                <IconButton className="text-taipeiPass" onClick={handleBackToProfile}>
                    <ArrowBackIcon />
                </IconButton>
                <p className="py-8">親子活動</p>
            </div>
            <div className="left-[-50%] h-[80%] w-[100%] 
                flex flex-col items-center justify-center"
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        places.map((place, index) => {
                            return (
                                <div className='border-4 border-taipeiPass rounded-lg mx-4 mb-6'>
                                    <Card sx={{ display: 'flex' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: '42%', height: 140 }}
                                            image={place.imgUrl[0]}
                                            alt="Live from space album cover"
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                    className='font-semibold'>
                                                    {place.name}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="div"
                                                >
                                                    {place.description}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </div>
                            )
                        })
                    }
                    <div
                        className='border-4 border-taipeiPass rounded-lg mx-4 mb-6 flex items-center justify-center font-semibold text-lg bg-taipeiPass text-white'
                        onClick={handleCardOpen}
                    >
                        拉霸決定今天去哪裡玩！
                    </div>
                </List>
            </div>
            <Modal
                className='flex items-center justify-center'
                open={cardOpen}
                onClose={handleCardClose}
                closeAfterTransition
                aria-labelledby="myCard"
                aria-describedby="this is my card"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={cardOpen}>
                    <div className='h-full w-full flex items-center justify-center'>
                        {/* <MyCard
                            name='random'
                            description='random'
                            imgUrl={["https://gipo.ntu.edu.tw/uploads/member_profile/avatar/5f48f3bb1d41c8097c0000c5/Peng.jpg"]}
                            price='0'
                            time='0'
                            rating='0'
                            closeModal={handleCardClose}
                        /> */}
                        <SlotMachine />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Collection;