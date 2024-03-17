"use server";

import db from "@/lib/db";

export const DeletePosts = async (title : string) => {
    if(!title) {
        return null;
    }
    
    const myPost = await db.posts.delete({
        where : {
            title : title
        }
    });

    if(myPost) {
        return {message : "Success", success : true}
    }

    return myPost;
}