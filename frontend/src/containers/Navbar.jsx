'use client';
import * as React from 'react';

const pages = [
    {
        title: 'Home',
        path: '/home',
        svg: (<svg version="1.1" id="圖層_1" focusable="false" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
            style={{ background: 'new 0 0 24 24' }} xmlSpace="preserve">
            <path d="M8.2,10.1C8.2,10.1,8.2,10.1,8.2,10.1C7.5,9.2,7.3,7.6,7.3,7c0-0.1-0.1-0.2-0.2-0.1c-2.1,1.2-4,3.9-4,6.6
    c0,4.6,3.2,8.5,8.7,8.5c5.2,0,8.7-4,8.7-8.5c0-5.9-4.2-9.8-7.9-11.5c-0.1,0-0.1,0-0.2,0.1c0,0,0,0.1,0,0.1
    C12.8,5.3,12.1,8.8,8.2,10.1z" />
        </svg>)
    },
    {
        title: 'Chat',
        path: '/chat',
        svg: (<svg version="1.1" id="圖層_1" focusable="false" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
            style={{ background: 'new 0 0 24 24' }} xmlSpace="preserve">
            <path d="M11.6,16.1c0-2.8,2.6-5.2,6-5.2c0.8,0,1.6,0.2,2.3,0.4c0-4-4-7.4-8.8-7.4c-5,0-9,3.4-9,7.5c0,2.6,1.7,5.1,4.2,6.3v2.8
        c0,0.3,0.2,0.5,0.6,0.3l3.6-1.8h0.9c0.4,0,0.8,0,1.2-0.1C11.9,18.1,11.6,17.1,11.6,16.1z M17.6,12.5c-2.5,0-4.5,1.6-4.5,3.7
        s2,3.8,4.5,3.8h0.3l0.6,0.2l1,0.6c0.3,0,0.6,0,0.6-0.4v-1.1c1.2-0.6,2-1.8,2-3.2C22,14.1,20,12.5,17.6,12.5
        C17.5,12.5,17.6,12.5,17.6,12.5z" />
        </svg>)
    },
    {
        title: 'Profile',
        path: '/profile',
        svg: (<svg version="1.1" id="圖層_1" focusable="false" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
            style={{ background: 'new 0 0 24 24' }} xmlSpace="preserve">
            <g>
                <path d="M16.1,13c1.3-1,2.1-2.6,2.1-5.6c0-3-2.6-5.5-5.9-5.5C9.1,2,6.4,4.4,6.4,7.5c0,3,0.8,4.7,2.2,5.7c-2.7,1.6-5.4,4.6-4.4,6.1
            c2,3.5,15.1,3.8,16.7,0.1C21.5,17.7,18.9,14.8,16.1,13" />
            </g>
        </svg>)
    }
];

const Navbar = () => {
    // const router = useRouter();
    // const pathname = usePathname();

    return (
        <div className='h-[44px] w-full mt-[2px] mb-[2px] flex items-center fixed justify-around bg-white ' >
            {
                pages.map((page, index) => {
                    <div
                        className='h-max w-8 py-1 cursor-pointer transistion duration-200 ease-in-out'
                        // style={pathname.includes(page.path) ? { fill: '#ff4458' } : { fill: '#7c8591' }}
                        onClick={() => console.log(`clicked ${page.title}`)}
                        key={index}
                    >
                        {page.svg}
                    </div>
                })
            }
        </div>
    );
}

export default Navbar;