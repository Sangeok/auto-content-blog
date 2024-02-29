"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormField,
    FormItem,
} from "@/components/ui/form";

import * as z from "zod";
import { modalStore } from "@/store/modal-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const formSchema = z.object({
    id: z.string().nonempty("Id is required"),
    password: z.string().nonempty("Password is required"),
});

export default function LoginModal() {
    const {isOpen, onOpen, onClose} = modalStore();

    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues : {
            id : "",
            password : "",
        },
    })

    const onSubmit = async (values : z.infer<typeof formSchema>) => {

        // need to make server action.

        console.log(values);
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden pb-8">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Are you SangEok?</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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