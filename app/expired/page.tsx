'use client';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react';

const ExpiredPage = () => {

    const router = useRouter();

    useEffect(() => {
        setTimeout(async () => {
            console.log("Executed!!")
            router.push("/");
        }, 5000);
    }, [])

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <span> Url Expired </span>
            <span> The page will be redirected after 5 seconds </span>
        </div>
    )
}

export default ExpiredPage;