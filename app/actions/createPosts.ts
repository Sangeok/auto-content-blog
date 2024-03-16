"use server";

import { PostsType } from "@/components/write/directWrite";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const CreatePosts = async (formData : PostsType) => {
    new Promise((resolve) => setTimeout(resolve, 1000));

    const post = await db.posts.create({
        data : {
            title : formData.title,
            subtitle : formData.subtitle,
            content : formData.content,
            imgUrl : formData.imageUrl
        }
    })

    if(post) {
        revalidatePath("/");
        return {message : "Success", success : true}
    }
    return {message : "Failed", success : false}
}