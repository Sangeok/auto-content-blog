"use client";

import { useEffect, useState } from "react";
import LoginModal from "../modals/loginModal";
import PostModal from "../modals/postModal";
import AiPostModal from "../modals/aiPostModal";

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
            <AiPostModal />
        </div>
    )
}