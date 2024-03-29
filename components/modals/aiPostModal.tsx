"use client";

import { modalStore } from "@/store/modal-store";
import { userStore } from "@/store/user-store";

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { AiPosting } from "@/app/actions/aiPosting";

const formSchema = z.object({
    title : z
        .string()
        .min(1, {message : "Title is required"}),
    subtitle : z.string().min(1, {message : "Subtitle is required"}),
    content : z.string().min(1, {message : "Content is required"}),
    imageUrl : z.string().min(1, {message : "Image is required"}),
})

const initFormState = {
    success : false,
    message : "",
}

export default function AiPostModal() {
    const { isOpen, onOpen, onClose, type } = modalStore();
    const {isAdmin} = userStore();
    const router = useRouter();

    const [formState, formAction] = useFormState(AiPosting, initFormState);

    const isModalOpen = isAdmin && isOpen && type === "ai";

    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues : {
            title : "",
        },
    })

    if(!isAdmin) {
        router.push("/");
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        어떤 글을 쓰시겠습니까?
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        쓰려는 글의 주제를 입력해주세요.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                        <form action={formAction} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field})=>(
                                    <FormItem className="mx-4">
                                        <FormControl>
                                            <Input
                                                className="focus:border-2 focus:border-black border-gray-300 bg-white rounded-md" 
                                                placeholder="title"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter className="bg-gray-100 px-6 py-4">
                                <div className="flex items-center justify-between w-full">
                                    <div/>
                                        <Button
                                            variant="primary"
                                        >
                                            Send
                                        </Button>
                                </div>
                            </DialogFooter>
                        </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}