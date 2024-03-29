"use server";

import openai from "@/lib/openai";

interface FormState {
    success : boolean
    message : string
}

export const AiPosting = async (
    preState : FormState,
    formData : FormData,
) : Promise<FormState> => {

    const title = formData.get("title") as string;

    console.log("title : " + title);

    const aiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages : [
            {
                role: "system", 
                content: "You are a helpful assistant."
            },
            {
                role : 'user',
                content : `Create small blog post with html tags based on this title : ${title}
                give me a 10 line.`
            },
        ],
    });

    console.log(aiResponse.choices[0]);

    if(aiResponse) {
        console.log("AI Response Success");
        return {
            success : true,
            message : "AI Response Success"
        }
    }

    return {
        success : false,
        message : "AI Response Failed"
    }
}