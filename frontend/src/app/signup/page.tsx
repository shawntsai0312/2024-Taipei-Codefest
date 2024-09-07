'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import './page.css'

function Page() {
    const router = useRouter();

    return (
        <div className='w-full h-full flex justify-around items-center flex-col just'>
            <div className='text-5xl w-full h-[48px] m-1 bg-white flex justify-center items-center'>
                Sign Up
            </div>
            <br />
            <div className='w-full h-[calc(100%-116px)] mt-1 mb-1 overflow-y-scroll flex justify-center items-center flex-col'>
                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your username here"
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{ }</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your profile here"
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{ }</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        placeholder="Enter your password here"
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{ }</label>
                </div>
                <br />
                <div className="form-group">
                    <select className="form-control">
                        <option value="select">Select your character</option>
                        <option value="First">Shop Owner</option>
                        <option value="Second">Artist</option>
                    </select>
                </div>
                <br />
                <div className="form-group">
                    <select className="form-control">
                        <option value="select">Select your style</option>
                        <option >Carpentry</option>
                        <option >Interior design</option>
                        <option >Architecture design</option>
                        <option >Sculpture</option>
                        <option >Paiting</option>
                        <option >Music</option>
                        <option >Comics</option>
                        <option >Fragrance</option>
                    </select>
                </div>
            </div>
            <br />
            <div className='w-[80%] h-[48px] m-1 flex justify-center bg-white'>
                <input className={'buttonContainer'} type="button" value={'sign up'} onClick={() => router.push('/home')} />
            </div>
        </div>
    )
}

export default Page