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

const Profile = () => {
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

    return (
        <div className="h-full w-full bg-gray-200">
            <div className="fixed left-[-50%] h-[58%] w-[200%]
                rounded-bl-[50%] rounded-br-[50%] bg-white
                flex flex-col items-center justify-center"
            >
                <Avatar className='w-[140px] h-[140px] cursor-pointer' alt={me.id} src={me.imgUrl} onClick={handleCardOpen} />
                <div className='w-[50%] h-[24px]'></div>
                <div className='w-[50%] h-[36px] text-[28px] flex items-center justify-center'>
                    {me.name}
                </div>
                <div className='h-[120px] w-[50%] mt-2 mb-2 text-[28px] flex flex-row items-center justify-around'>
                    <div className='h-[70%] flex flex-col items-center justify-around text-[16px] cursor-pointer'
                        onClick={handleSettingOpen}
                    >
                        <div className='h-[48px] w-[48px] opacity-[50%]
                            border-[1px] border-black rounded-full
                            flex items-center justify-around'
                        >
                            <SettingsIcon />
                        </div>
                        APP 設定
                    </div>
                    <div className='h-[80%] mt-[40px] flex flex-col items-center justify-around text-[16px] cursor-pointer'
                        onClick={handleEditOpen}
                    >
                        <div className='h-[48px] w-[48px] opacity-[90%]
                            border-[1px] border-black rounded-full
                            flex items-center justify-around'
                        >
                            <CreateOutlinedIcon />
                        </div>
                        編輯個人資料
                    </div>
                    <div className='h-[70%] flex flex-col items-center justify-around text-[16px] cursor-pointer'
                        onClick={handlePreferenceOpen}
                    >
                        <div className='h-[48px] w-[48px] opacity-[50%]
                            border-[1px] border-black rounded-full
                            flex items-center justify-around'
                        >
                            <TuneIcon />
                        </div>
                        喜好調整
                    </div>
                </div>
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
                        <MyCard name={me.name} description={me.description} imgUrl={me.imgUrl} closeModal={handleCardClose} />
                    </div>
                </Fade>
            </Modal>
            
            <Modal
                className='flex items-center justify-center'
                open={settingOpen}
                onClose={handleSettingClose}
                closeAfterTransition
                aria-labelledby="setting"
                aria-describedby="this is my setting"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={settingOpen}>
                    <div className='h-full w-full flex items-center justify-center'>
                        <Setting />
                    </div>
                </Fade>
            </Modal>

            <Modal
                className='flex items-center justify-center'
                open={editOpen}
                onClose={handleEditClose}
                closeAfterTransition
                aria-labelledby="edit"
                aria-describedby="edit my profile"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={editOpen}>
                    <div className='h-full w-full flex items-center justify-center'>
                        <Edit />
                    </div>
                </Fade>
            </Modal>

            <Modal
                className='flex items-center justify-center'
                open={preferenceOpen}
                onClose={handlePreferenceClose}
                closeAfterTransition
                aria-labelledby="preference"
                aria-describedby="this is my preference"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={preferenceOpen}>
                    <div className='h-full w-full flex items-center justify-center'>
                        <Preference />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Profile;