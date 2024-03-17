"use server";

import db from "@/lib/db";

export const FindPosts = async (title : string) => {
    if(!title) {
        return null;
    }
    
    const myPost = await db.posts.findUnique({
        where : {
            title : title
        }
    });

    if(!myPost) {
        return null;
    }

    return myPost;
}