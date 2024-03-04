import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const CreatePosts = async (formData : FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imgUrl = formData.get("imageUrl") as string;

    const post = await db.posts.create({
        data : {
            title,
            content,
            imgUrl
        }
    })

    revalidatePath("/");
    
}