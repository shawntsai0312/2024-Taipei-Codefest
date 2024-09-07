'use client'
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

import Button from '@mui/material/Button';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import MuseumIcon from '@mui/icons-material/Museum';
import WcIcon from '@mui/icons-material/Wc';
// import SlotMachine from '../slotMachine';

const Collection1 = () => {

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="h-[10%] w-full text-[28px] flex font-bold text-taipeiPass">
                <p className="p-8">親子活動</p>
            </div>
            <div className="left-[-50%] h-[80%] w-[200%] 
                flex flex-col items-center justify-center"
            >
                <Button className="w-[42%] h-[25%] text-[34px] rounded-3xl font-semibold bg-taipeiPass" variant="contained" startIcon={<FamilyRestroomIcon  />} >
                    親子活動
                </Button>
            </div>
        </div>
    )
}

export default Collection1;