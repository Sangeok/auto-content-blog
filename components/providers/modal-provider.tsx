"use client";

import { useEffect, useState } from "react";
import LoginModal from "../modals/loginModal";
import PostModal from "../modals/postModal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
        <div>
            <LoginModal />
            <PostModal />
        </div>
    )
}