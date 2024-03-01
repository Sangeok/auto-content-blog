"use client";

import { modalStore } from "@/store/modal-store";
import { userStore } from "@/store/user-store";

import Link from "next/link";

export default function Navbar() {
    const {onOpen, isOpen} = modalStore();
    const {isAdmin, logOutAdmin} = userStore();

    return (
        <div className="mb-5">
            <div className="flex justify-between items-center w-full bg-black text-white text-wh-10 px-10 py-4">
                <div><Link href="/">SangEok</Link></div>
                <div className="flex justify-between items-center gap-10">
                    <div>
                        <Link href="/posts">Posts</Link>
                    </div>
                    <div>
                        <Link href="/about">About</Link>
                    </div>
                    {
                        !isAdmin && (
                            <div onClick={()=>onOpen()}>
                                Login
                            </div>
                        )
                    }
                    {
                        isAdmin && (
                            <div onClick={()=>logOutAdmin()}>
                                Logout
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}