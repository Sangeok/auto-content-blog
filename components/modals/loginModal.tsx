"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";

import * as z from "zod";
import { modalStore } from "@/store/modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {LoginAdmin} from "@/app/actions/loginAdmin";
import { useEffect } from "react";
import { userStore } from "@/store/user-store";

const formSchema = z.object({
    id: z.string().nonempty("Id is required"),
    password: z.string().nonempty("Password is required"),
});

const initFormState = {
    success : false,
    message : "",
}

export default function LoginModal() {
    const {isOpen, onOpen, onClose, type} = modalStore();
    const {loginAdmin} = userStore();

    const [formState, formAction] = useFormState(LoginAdmin, initFormState);

    const isModalOpen = isOpen && type === "login";
    

    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues : {
            id : "",
            password : "",
        },
    })

    useEffect(()=>{
        if(formState.success) {
            form.reset();
            onClose();
            loginAdmin();
        }
    }, [formState])

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden pb-8">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Are you SangEok?</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form action={formAction} className="space-y-8">
                        <div className="space-y-8 px-6">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Id"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        </div>
                        <DialogFooter className="px-6">
                            <Button variant="custom">
                                Login
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}