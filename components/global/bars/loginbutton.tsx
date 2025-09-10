'use client'

import React from 'react'
import { personIcon, logoutIcon } from '@/public/svgs/svgs-file'
import { useUserStore } from '@/store/userstore'
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { baseInstance } from '@/constants/apis';
import Image from 'next/image';
import dialogHeaderImage from '@/public/dialog/dialog1.jpeg'
import { motion } from 'framer-motion';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const LoginButton = () => {

    const { setUser, isAuthenticated, name, photo, setNullUser } = useUserStore()

    const login = useGoogleLogin({
        onSuccess: async (resData) => {
            const res = await baseInstance.post("/user/auth/callback", { code: resData.code })
            setUser(res.data.id, res.data.name, res.data.email, res.data.photo, res.data.access_token, res.data.refresh_token)
        },
        onError: error => console.error(error),
        flow: "auth-code",
        redirect_uri: "/",
    });
    const handleSignin = () => { login() };
    const logout = () => {
        googleLogout();
        setNullUser();
    }

    if (isAuthenticated)
        return (
            <div className='xl:flex xl:flex-row xl:gap-2 xl:place-items-center'>

                <div className='ml-30'>
                    <Dialog>
                        <DialogTrigger>
                            <div className='flex gap-2 mb-4 xl:mb-0 place-items-center'>
                                <Image src={photo} height={25} width={25} alt='Profile Picture' className='rounded-full' />
                                <p className='text-base font-light text-transform: uppercase'>{name}</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='flex flex-row gap-3'>
                                    <Image src={dialogHeaderImage} className='w-full h-full' alt='something to take the edge off' />
                                    <span className='hidden lg:block lg:mt-8 lg:text-[#ff8c00]'>
                                        {/* Are you absolutely sure you want to sign out? */}
                                        Careful… the lions will think you’re running away!
                                    </span>
                                </DialogTitle>
                                <DialogDescription className='mt-1'>
                                    <span className='hidden lg:block lg:font-bold lg:text-base'>
                                        Are you absolutely sure you want to sign out? <br />
                                    </span>
                                    <span>
                                        You will have to login the next time you visit
                                    </span>
                                    <button type='button'
                                        className='cursor-pointer text-semibold
                                        uppercase bg-black text-white h-[40px] 
                                        w-full text-center xl:ml-[0%] mt-[3%]'
                                        onClick={logout}
                                    >
                                        SIGN OUT
                                    </button>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        )

    return (
        <motion.button
            className='
            flex flex-row items-center gap-2 text-white  bg-black w-[200px]
            cursor-pointer xl:ml-[50%] h-[45px] justify-center uppercase' 
            onClick={handleSignin}>
            {personIcon} GET STARTED
        </motion.button>
    )
}

export default LoginButton