"use server";

import { PostsType } from "@/components/write/directWrite";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const UpdatePosts = async (formData : PostsType, postId : string) => {
    new Promise((resolve) => setTimeout(resolve, 1000));
    const id = parseInt(postId);
    console.log("img" + formData.imageUrl);

    const post = await db.posts.update({
        where : {
            id : id
        },
        data : {
            title : formData.title,
            subtitle : formData.subtitle,
            content : formData.content,
            imgUrl : formData.imageUrl,
            updatedAt : new Date()
        }
    })

    if(post) {
        revalidatePath("/");
        return {message : "Success", success : true}
    }
    return {message : "Failed", success : false}
}