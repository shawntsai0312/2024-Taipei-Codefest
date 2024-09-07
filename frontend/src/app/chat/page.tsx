'use client'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { useRouter } from 'next/navigation';

import friends from '../../../public/resource/chatData/friends.json'

interface FriendProps {
    id: string;
    name: string;
    description: string;
    imgUrl: string;
    chatDataUrl: string;
    lastMessage: string;
}

const Chat = () => {
    const router = useRouter();

    const handleChatClick = (friend: FriendProps) => {
        // Add your logic here to navigate to the chatbox or perform any other action
        console.log(`Clicked on chat with ${friend.name}`);
        router.push(`/chat/${friend.id}`);
    };

    return (
        <div className="w-full h-full absolute top-0 p-3">
            <div className="w-full h-[44px] absolute top-0 p-3">
                <p className="text-black text-xl">聊天室</p>
            </div>

            <List className='absolute top-[44px] overflow-y-scroll' sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    friends.map((friend, index) => {
                        return (
                            <>
                                <ListItem alignItems="flex-start"
                                    onClick={() => handleChatClick(friend)}
                                    className='hover: border-gray-300 hover:bg-gray-100 cursor-pointer'
                                >
                                    <ListItemAvatar>
                                        <Avatar alt={friend.id} src={friend.imgUrl} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={friend.name}
                                        secondary={friend.lastMessage}
                                    />
                                </ListItem>
                                {
                                    index === friends.length - 1 ? null : <Divider variant="inset" component="li" />
                                }
                            </>
                        )
                    })
                }
            </List>
        </div>

    )
}

export default Chat;