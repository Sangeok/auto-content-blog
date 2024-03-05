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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePosts } from "@/app/actions/createPosts";
import { Textarea } from "../ui/textarea";
import FileUpload from "../file-upload";
import EditorMenuBar from "../editorMenuBar";
import Tiptap from "../tiptap";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../ui/singleImageDropZone";

const formSchema = z.object({
    title : z
        .string()
        .min(1, {message : "Title is required"}),
    content : z.string().min(1, {message : "Content is required"}),
    imageUrl : z.string().min(1, {message : "Image is required"}),
})

export default function DirectWrite() {

    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();

    const uploadImgeHandler = async () => {
        console.log("실행")
        if (file) {
            // 여기서 사진이 아니면 upload못하게 하면 좋긴한데 어짜피 나만 쓰니까 패스
            const res = await edgestore.publicFiles.upload({
                file,
            });

            if(res.url) {
                // url이 등록 되고 나서 imageUrl을 저장해야함.
                form.reset((formValues) => ({
                    ...formValues,
                    imageUrl : res.url,
                }))
            }
        }
    }

    useEffect(()=>{
        if(file) {
            uploadImgeHandler();
        }
    }, [file]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues : {
            title : "",
            content : "",
            imageUrl : "",
        },
    })

    const onActions = (values : z.infer<typeof formSchema>) => {
        console.log(values);
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
                    onChange={(file) => {
                        setFile(file);
                    }}
                />
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onActions)} className="space-y-8">
                            <div className="space-y-8 px-6">
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
                                name="content"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                        <Tiptap
                                            placeholder="content"
                                            onChange={field.onChange}
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