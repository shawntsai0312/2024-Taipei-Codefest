'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';

interface chatContent {
    sender: string;
    content: string;
}

interface chatData {
    name: string;
    content: chatContent[];
}

interface ParamsProps {
    chatBox: string;
}

interface chatBoxProps {
    params: ParamsProps;
}

const ChatBox = async ({ params }: chatBoxProps) => {
    const imgUrl = '/resource/chatData/img/' + params.chatBox + '.jpg';
    const router = useRouter();

    const [jsonData, setJsonData] = useState<chatData | null>(null);

    useEffect(() => {
        const loadJsonData = async () => {
            try {
                // Dynamically import JSON file based on condition
                const loadedJsonData = await import(`../../../../public/resource/chatData/chat/${params.chatBox}.json`);
                setJsonData(loadedJsonData.default);
            } catch (error) {
                console.error('Error loading JSON data:', error);
            }
        };

        loadJsonData();
    }, [params.chatBox]);

    const handleGoBack = () => {
        router.push('/chat');
    };

    if (!jsonData) {
        return <div className="w-full h-full justify-center align-middle">Loading...</div>;
    } else {
        console.log(jsonData)
    }

    // Render JSON data
    return (
        <div className="w-full h-full">
            <Stack className="pt-[5px] pb-[5px] p-1 text-3xl" direction="row" spacing={2} alignItems="center">
                <ArrowBackIosNewIcon className="pr-1" sx={{ width: 34, height: 34 }} onClick={handleGoBack} />
                {jsonData.name}
            </Stack>
            <div className="overflow-y-scroll h-[calc(100%-46px-46px)] bg-slate-50 z-[-30]">
                {
                    jsonData ?
                        jsonData.content.map((chat, index) => (
                            <Stack className="mt-2 mb-2 p-3 z-[10] relative " key={index} direction="row" spacing={2} alignItems="center" justifyContent={chat.sender === 'me' ? 'flex-end' : 'flex-start'}>
                                {
                                    chat.sender === 'me' ? null : <Avatar sx={{ width: 34, height: 34 }} alt="Remy Sharp" src={imgUrl} />
                                }
                                <div className={`relative inline-block clear-both align-top rounded-lg
                                 px-[6px] py-[6px]
                                bg-gray-200 border-2 max-w-[60%]
                                ${chat.sender === 'me' ? 'float-right self-end' : 'float-left self-start'}`}
                                    key={index}
                                >
                                    {chat.content}
                                </div>
                            </Stack>
                        ))
                        : 'You have no chat data'
                }
            </div>
            <Stack className='h-[46px] p-1 fixed bottom-[calc(46px)]  w-full z-[9999] bg-white' alignItems="center" direction="row">
                <TextField size='small' fullWidth label={`To ${jsonData.name}`} id="fullWidth" />
                <SendRoundedIcon sx={{ width: 34, height: 34 }} />
            </Stack>
        </div >
    );
};

export default dynamic(() => Promise.resolve(ChatBox), {
    ssr: false // Set to false to ensure dynamic import works client-side only
});