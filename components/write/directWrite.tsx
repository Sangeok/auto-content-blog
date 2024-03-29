"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel
} from "../ui/form";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePosts } from "@/app/actions/createPosts";
import { Textarea } from "../ui/textarea";
import FileUpload from "../file-upload";
import EditorMenuBar from "../editorMenuBar";
import Tiptap from "../tiptap";

import { startTransition, useEffect, useState, useTransition } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../ui/singleImageDropZone";
import { userStore } from "@/store/user-store";
import { useRouter, useSearchParams } from "next/navigation";
import { FindPosts } from "@/app/actions/findPosts";
import { UpdatePosts } from "@/app/actions/updatePosts";

interface WriterDirectProps {
    title : string;
    subtitle : string;
    content : string;
    imageUrl : string;
    isEdit : boolean;
    postId? : string;
}

const formSchema = z.object({
    title : z
        .string()
        .min(1, {message : "Title is required"}),
    subtitle : z.string().min(1, {message : "Subtitle is required"}),
    content : z.string().min(1, {message : "Content is required"}),
    imageUrl : z.string().min(1, {message : "Image is required"}),
})

export type PostsType = z.infer<typeof formSchema>;

export default function DirectWrite({
    title,
    subtitle,
    content,
    imageUrl,
    postId,
    isEdit = false
}: WriterDirectProps) {
    const {isAdmin} = userStore();
    const router = useRouter();

    const [file, setFile] = useState<File>();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues : {
            title : title,
            subtitle : subtitle,
            content : content,
            imageUrl : imageUrl,
        },
    })

    const [pending, startTransition] = useTransition();

    const onSubmit = async (data : PostsType) => {
        if(isEdit && postId) {
            startTransition(async () => {
                const res = await UpdatePosts(data,postId);
                if(res?.success) {
                    alert("게시글 수정완료.");
                    router.push("/");
                }
            });
            return;
        }
        startTransition(async () => {
            const res = await CreatePosts(data);
            if(res?.success) {
                router.push("/");
            }
        });
    };

    if(!isAdmin) {
        router.push("/");
    }
    
    return (
        <div className="mt-8 mx-auto w-full max-w-3xl px-4">
            <div className="bg-white py-8 shadow rounded-lg px-10">
                <h1 className="text-center text-2xl font-extrabold mb-10">
                    Create a Post!
                </h1>
                <div className="w-full flex justify-center">
                <SingleImageDropzone
                    width={200}
                    height={200}
                    value={file}
                    imgUrl={imageUrl}
                    onChange={(file) => {
                        setFile(file);
                        console.log(file);
                    }}
                />
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                                file={file}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="subtitle"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>SubTitle</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="focus:border-2 focus:border-black border-gray-300 bg-white rounded-md" 
                                                placeholder="Subtitle"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                        <Tiptap
                                            placeholder="content"
                                            onChange={field.onChange}
                                            content={content}
                                        />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            </div>
                            <div className="flex justify-end">
                                <Button className="justify-end"variant="custom">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}