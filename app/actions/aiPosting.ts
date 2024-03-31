"use server";

import openai from "@/lib/openai";

interface FormState {
    success : boolean
    message : string;
}

export const AiPosting = async (
    preState : FormState,
    formData : FormData,
) : Promise<FormState> => {

    const title = formData.get("aiTitle") as string;

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
                (Dont give me <!DOCTYPE html>,<html>,<head>,<title>,'<body> tags. Just give me the content inside <body> tag)
                (Give me a word count of 2000-3000 words.)
                `
                
            },
        ],
    });

    console.log(aiResponse.choices[0].message.content);

    if(aiResponse) {
        if (aiResponse?.choices?.[0]?.message?.content) {
            console.log("AI Response Success");
            return { success: true, message: aiResponse.choices[0].message.content };
        }
    }

    return {
        success : false,
        message : "AI Response Failed"
    }
}