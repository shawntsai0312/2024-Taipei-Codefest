'use client'
import { useState,useEffect } from 'react';
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
import { useRouter, usePathname } from 'next/navigation';
import MyCard from './myCard';
import SlotMachine from '@/app/slot/page';
import axios from 'axios'

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

const Collection = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleBackToProfile = () => {
        router.push('/profile');
    };
    
    const [jsonData, setJsonData] = useState<Place[] | null>(null);
    const [header, setHeader] = useState<string>('藝文活動');
    const [cardOpen, setCardOpen] = useState(false);
    const handleCardOpen = () => setCardOpen(true);
    const handleCardClose = () => setCardOpen(false);

    useEffect(() => {
        // console.log('hello')
        const fetchData = async () => {
            try {
                let url = ''
                // console.log(pathname)
                if (pathname === '/profile/art'){
                    url = `http://127.0.0.1:5000/api/1/fetch_like_data`
                    setHeader('藝文活動')
                } 
                if (pathname === '/profile/child'){
                    url = `http://127.0.0.1:5000/api/2/fetch_like_data`
                    setHeader('親子活動')
                } 
                if (pathname === '/profile/couple'){
                    url = `http://127.0.0.1:5000/api/3/fetch_like_data`
                    setHeader('情侶約會')
                } 

                // const url = `http://127.0.0.1:5000/api/generate_banner`
                // console.log(url)
                const response = await axios.get(url)

                if (response.status === 200) {
                    console.log(response.data)
                    if(response.data){
                        console.log(response.data.data.documents)
                        setJsonData(response.data.data.documents)
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [pathname])

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="h-[10%] w-full text-xl flex items-center font-bold text-taipeiPass px-4">
                <IconButton className="text-taipeiPass" onClick={handleBackToProfile}>
                    <ArrowBackIcon />
                </IconButton>
                <p className="py-8">{header}</p>
            </div>
            <div className="left-[-50%] h-[80%] w-[100%] 
                flex flex-col items-center justify-center"
            >
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        jsonData? jsonData.map((place, index) => {
                            console.log(place)
                            return (
                                <div className='border-2 border-taipeiPass rounded-lg mx-4 mb-4'>
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
                                                    className='font-semibold text-base'>
                                                    {place.name}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle1"
                                                    component="div"
                                                    className='text-xs'
                                                >
                                                    {place.description}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </div>
                            )
                        }):<></>
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
                        <SlotMachine options={jsonData?.map(place=>place.name)}/>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Collection;