"use server"

import db from "@/lib/db";

interface FormState {
    success : boolean
    message : string
}

export const LoginAdmin = async (
    preState : FormState,
    formData : FormData,
) : Promise<FormState> => {
    const id = formData.get("id") as string;
    const password = formData.get("password") as string;

    const admin = await db.admin.findFirst({
        where : {
            userId : id,
            password : password
        }
    })

    if(admin) {
        console.log("Login Success");
        return {
            success : true,
            message : "Login Success"
        }
    } else {
        console.log("Login Failed");
        return {
            success : false,
            message : "Login Failed"
        }
    }
}