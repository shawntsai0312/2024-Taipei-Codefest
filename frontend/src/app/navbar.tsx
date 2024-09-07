'use client';
import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface PageProps {
    title: string;
    path: string;
    svg: React.ReactElement;
}

const pages: PageProps[] = [
    {
        title: 'Home',
        path: '/home',
        svg: <img src='/resource/icon for taipeicode/home.svg' alt="art" style={{ height: '80%', width: '100%' }}/>
    },
    {
        title: 'Map',
        path: '/map',
        svg: <img src='/resource/icon for taipeicode/map.svg' alt="art" style={{ height: '80%', width: '100%' }} />
    },
    {
        title: 'Profile',
        path: '/profile',
        svg: <img src='/resource/icon for taipeicode/profile.svg' alt="art" style={{ height: '80%', width: '100%' }} />
    }
];

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className='h-[44px] w-full mt-[2px] mb-[2px] flex items-center fixed justify-around bg-white' >
            {
                pages.map((page, index) =>
                    <div
                        className='h-max w-8 py-1 cursor-pointer transition duration-200 ease-in-out text-center'
                        style={pathname.includes(page.path) ? { fill: '#5AB4C5' } : { fill: '#ADB8BE' }}
                        onClick={() => router.push(page.path)}
                        key={index}
                    >
                        {page.svg}
                    </div>
                )
            }
        </div>
    );
}

export default Navbar;