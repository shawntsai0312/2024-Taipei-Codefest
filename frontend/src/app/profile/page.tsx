'use client'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import me from '../../../public/resource/profileData/me.json'
import MyCard from './myCard';
import Setting from './setting';
import Edit from './edit';
import Preference from './preference';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MuseumIcon from '@mui/icons-material/Museum';
import WcIcon from '@mui/icons-material/Wc';

const Profile = () => {
    const router = useRouter();

    const [cardOpen, setCardOpen] = useState(false);
    const handleCardOpen = () => setCardOpen(true);
    const handleCardClose = () => setCardOpen(false);

    const [settingOpen, setSettingOpen] = useState(false);
    const handleSettingOpen = () => setSettingOpen(true);
    const handleSettingClose = () => setSettingOpen(false);


    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const [preferenceOpen, setPreferenceOpen] = useState(false);
    const handlePreferenceOpen = () => setPreferenceOpen(true);
    const handlePreferenceClose = () => setPreferenceOpen(false);

    const handleGoToCollection1 = () => {
        router.push('/profile/collection1');
    };
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="h-[8%] w-full text-[28px] flex font-bold text-taipeiPass">
                <p className="px-8">
                    我的口袋名單
                </p>
            </div>
            <div className="left-[-50%] h-[80%] w-[200%] 
                flex flex-col items-center justify-center"
            >
                <Button
                    className="w-[42%] h-[25%] text-[34px] rounded-3xl font-semibold bg-taipeiPass"
                    variant="contained"
                    startIcon={<FamilyRestroomIcon fontSize='large' />}
                    onClick={handleGoToCollection1}
                >
                    親子活動
                </Button>
                <div className='w-[40%] h-[6%]'></div>
                <Button
                    className="w-[42%] h-[25%] text-[34px] rounded-3xl font-semibold bg-taipeiPass"
                    variant="contained"
                    startIcon={<MuseumIcon />}>
                    藝文活動
                </Button>
                <div className='w-[40%] h-[6%]'></div>
                <Button
                    className="w-[42%] h-[25%] text-[34px] rounded-3xl font-semibold bg-taipeiPass"
                    variant="contained"
                    startIcon={<WcIcon />}>
                    情侶約會
                </Button>
            </div>
        </div>
    )
}

export default Profile;