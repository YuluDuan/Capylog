"use client"
import Image from "next/image";
import {inter, interR} from "@/app/font";
import React, {useEffect, useState} from "react";
import Link from "next/link";

function MainPage () {
    const [bearUp, setBearUp] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setBearUp(true);
        }, 2000),
            setTimeout(() => {
                setShow(true);
            }, 2200)
    }, []);

    return (
        <main className="flex flex-col content-center h-screen bg-main">
            <div className="space-y-3 pl-30 ml-10" style={{
                transition: 'transform 0.3s ease', // Try adding ease to the end of this string and see if you like it better
                transform: bearUp ? 'translate(10px, -100px)' : 'translate(0px, 0px)'
            }}>
                <Image
                    className="pt-36"
                    src="/assets/capy.svg"
                    alt="capylog"
                    width={320}
                    height={24}
                    priority
                />
                <p className={`pl-28 text-2xl ${inter.className} contetn-center text-main-dark`}>
                    CapyLog
                </p>
                <p className={`${inter.className} text-main-dark`}>
                    Daily Journalling to Rewrite Your Mindset
                </p>
                <div className={`${interR.className} text-main-dark pt-6`} style={{
                    transition: 'visibility 0.2s ease', // Try adding ease to the end of this string and see if you like it better
                    visibility: show ? 'visible' : 'hidden'
                }}>
                    <div className="flex flex-row">
                        <p> First name:
                            <input type="text" className="mx-2 my-3 bg-main-light pl-1 pr-3 py-1 rounded-md"/>
                        </p>
                        <p> Last name:
                            <input type="text" className="mx-2 my-3 bg-main-light pl-1 pr-3 py-1 rounded-md"/>
                        </p>
                    </div>
                    <p> Password:
                        <input type="text" className="mx-5 my-3 bg-main-light pl-1 pr-7 py-1 rounded-md"/>
                    </p>
                    <button
                        className={`${inter.className} my-5 ml-28 text-main-dark bg-main-box w-16 rounded-sm`}> Login
                    </button>
                    <p>Not a member yet? <Link href="" className={`${inter.className} pl-28 text-main-dark pt-6`}> Sign
                        up </Link></p>
                </div>
            </div>
        </main>
    );
}

export default MainPage;